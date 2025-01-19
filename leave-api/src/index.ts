import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
}

type LeaveRequest = {
  from_email: string
  leave_type: 'full day' | 'half day'
  reason: string
  date: string // ISO 8601 format (YYYY-MM-DD)
  status: 'pending' | 'approved' | 'rejected' // More comprehensive status
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
	// Replace with your desired origin
	origin: '*',
	// Adjust allowed methods as needed
	allowMethods: ['GET', 'POST','PATCH'],
	// Adjust allowed headers as needed
	allowHeaders: ['Content-Type', 'Authorization','*'],
  }))

// GET all leave requests
app.get('/leaves', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM leaves').all()
    return c.json(results)
  } catch (error) {
    console.error("Error fetching leaves:", error)
    return c.json({ error: 'Failed to fetch leave requests' }, 500)
  }
})

// POST a new leave request
app.post('/leaves', async (c) => {
  try {
    const leaveRequest = await c.req.json<LeaveRequest>()

    // Validate input (important!)
    if (!leaveRequest.from_email || !leaveRequest.leave_type || !leaveRequest.reason || !leaveRequest.date) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const stmt = c.env.DB.prepare(
      'INSERT INTO leaves (from_email, leave_type, reason, date, status) VALUES (?, ?, ?, ?, ?)'
    )
    const info = await stmt.bind(
      leaveRequest.from_email,
      leaveRequest.leave_type,
      leaveRequest.reason,
      leaveRequest.date,
      'pending' // Initial status is pending
    ).run()

    if (info.success) {
      return c.json({ message: 'Leave request submitted successfully' }, 201)
    } else {
      return c.json({ error: 'Failed to submit leave request' }, 500)
    }
  } catch (error) {
    console.error("Error creating leave:", error)
    return c.json({ error: 'Invalid request body or database error' }, 400)
  }
})

app.patch('/leaves/:id', async (c) => {
	const leaveId = c.req.param('id');
	const { status } = await c.req.json(); // Get new status from request body
  
	if (!status || !['approved', 'rejected'].includes(status)) {
	  return c.json({ error: 'Invalid status' }, 400); // Only accept 'approved' or 'rejected' status
	}
  
	try {
	  // Update the leave status in the database
	  const stmt = c.env.DB.prepare(
		'UPDATE leaves SET status = ? WHERE id = ? AND status = ?'
	  );
	  const info = await stmt.bind(status, leaveId, 'pending').run(); // Only update if the status is still 'pending'
  
	  if (info.success) {
		return c.json({ message: `Leave request ${status} successfully` });
	  } else {
		return c.json({ error: 'Leave request not found or status already changed' }, 400);
	  }
	} catch (error) {
	  console.error('Error updating leave status:', error);
	  return c.json({ error: 'Database error' }, 500);
	}
  });
  

export default app