
//     // Add after the leaveRequests array declaration
const users = [
    { id: '1', email: 'admin@gmail.com', password: 'admin123', role: 'admin', name: 'Admin User', department: 'Administration' },
    { id: '2', email: 'hod@gmail.com', password: 'hod123', role: 'HOD', name: 'HOD', department: 'Management' },
    { id: '3', email: 'principle@gmail.com', password: 'kiran123', role: 'staff', name: 'principle', department: 'CSE' },
    { id: '4', email: 'staff@gmail.com', password: 'staff123', role: 'staff', name: 'srinivas sir', department: 'CSE' }
];

//     const staffAvailability = JSON.parse(localStorage.getItem('staffAvailability')) || [];
//     function saveStaffAvailability() {
// localStorage.setItem('staffAvailability', JSON.stringify(staffAvailability));
// window.dispatchEvent(new StorageEvent('storage', {
//     key: 'staffAvailability',
//     newValue: JSON.stringify(staffAvailability)
// }));
// }

//     const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
//     const hodSecretCode = 'hodsecret';
//     let isHodVerified = false;
//     function saveLeaveRequests() {
// localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
// // Dispatch storage event for other tabs
// window.dispatchEvent(new StorageEvent('storage', {
//     key: 'leaveRequests',
//     newValue: JSON.stringify(leaveRequests)
// }));
// }

//     const scheduledClasses = JSON.parse(localStorage.getItem('scheduledClasses')) || [];
//     function saveScheduledClasses() {
// localStorage.setItem('scheduledClasses', JSON.stringify(scheduledClasses));
// window.dispatchEvent(new StorageEvent('storage', {
//     key: 'scheduledClasses',
//     newValue: JSON.stringify(scheduledClasses)
// }));
// }

//     function updateClassScheduleTable() {
//         const tableBody = document.getElementById('class-schedule-table').querySelector('tbody');
//         tableBody.innerHTML = '';
//         scheduledClasses.forEach((scheduledClass) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${scheduledClass.className}</td>
//                 <td>${scheduledClass.teacherName}</td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }
//     document.getElementById('class-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const className = document.getElementById('class-name').value;
//         const teacherName = document.getElementById('teacher-name').value;
//         const scheduledClass = { 
//             className, 
//             teacherName,
//             date: new Date().toISOString().split('T')[0] // Add today's date
//         };
//         scheduledClasses.push(scheduledClass);
//         saveScheduledClasses();
//         document.getElementById('class-message').innerText = 
//             `Class ${className} scheduled with teacher ${teacherName}`;
//         updateClassScheduleTable();
//     });
//     document.getElementById('clear-leave-history').addEventListener('click', function() {
//         localStorage.removeItem('leaveRequests');
//         leaveRequests.length = 0; // Clear the array
//         updateLeaveRequestsTable();
//         document.getElementById('leave-message').innerText = 'Leave history cleared.';
//     });

//     document.getElementById('clear-class-history').addEventListener('click', function() {
//         localStorage.removeItem('scheduledClasses');
//         scheduledClasses.length = 0; // Clear the array
//         updateClassScheduleTable();
//         document.getElementById('class-message').innerText = 'Class history cleared.';
//     });
//     document.getElementById('class-form').addEventListener('submit', function(event) {
// event.preventDefault();
// const className = document.getElementById('class-name').value;
// const teacherName = document.getElementById('teacher-name').value;
// const date = document.getElementById('class-date').value;

// // Add new scheduled class
// const scheduledClass = {
//     className,
//     teacherName,
//     date
// };
// scheduledClasses.push(scheduledClass);
// saveScheduledClasses();

// // Update displays
// updateClassScheduleTable();
// updateFreeStaffTable(date);
// });

//     // Initial call to update the table on page load
//     updateClassScheduleTable();

//     // Replace the existing updateLeaveRequestsTable function
//     function updateLeaveRequestsTable() {
//         console.log('Updating table, current requests:', leaveRequests);
//         const tableBody = document.getElementById('leave-requests-table').querySelector('tbody');
//         const approvalColumn = document.querySelector('.approval-column');
        
//         // Show/hide approval column based on HOD verification
//         if (approvalColumn) {
//             approvalColumn.style.display = isHodVerified ? 'table-cell' : 'none';
//         }
        
//         tableBody.innerHTML = '';
//         leaveRequests.forEach((request, index) => {
//             const status = isHodVerified ? (request.status || 'Pending') : 'Pending';
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>From: ${request.senderEmail}<br>To: ${request.receiverEmail}</td>
//                 <td>${request.reason}</td>
//                 <td>${request.date}</td>
//                 ${isHodVerified ? 
//                     `<td class="approval-column">
//                         <button onclick="window.approveLeave(${index})" 
//                                 class="approve-btn" 
//                                 ${status !== 'Pending' ? 'disabled' : ''}>
//                             Approve
//                         </button>
//                         <button onclick="window.rejectLeave(${index})" 
//                                 class="reject-btn" 
//                                 ${status !== 'Pending' ? 'disabled' : ''}>
//                             Reject
//                         </button>
//                     </td>` 
//                     : '<td class="approval-column"></td>'}
//                 <td class="status-${status.toLowerCase()}">${status}</td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }
//     // Update CSS
//     const style = document.createElement('style');
//         style.textContent = `
//             .status-approved { color: green; font-weight: bold; }
//             .status-rejected { color: red; font-weight: bold; }
//             .status-pending { color: orange; }
//             .approve-btn { background-color: #4CAF50; color: white; margin: 2px; }
//             .reject-btn { background-color: #f44336; color: white; margin: 2px; }
//         `;
//         document.head.appendChild(style);
//     window.approveLeave = approveLeave;
//     window.rejectLeave = rejectLeave;

//     function approveLeave(index) {
// console.log('Approving request at index:', index);
// if (leaveRequests[index]) {
//     const request = leaveRequests[index];
//     console.log('Attempting to send approval email to:', request.senderEmail);
    
//     // Update status first
//     request.status = 'Approved';
//     request.approved = true;
//     saveLeaveRequests();
//     updateLeaveRequestsTable();

//     // Send email with detailed parameters
//     emailjs.send(
//         "service_nopqic4",
//         "template_ew9dt4z",
//         {
//             to_name: request.senderEmail.split('@')[0],
//             to_email: request.senderEmail,
//             from_name: "HOD",
//             from_email: 'missionmoneyheist700@gmail.com',
//             subject: "Leave Request Approved",
//             message: `Your leave request has been APPROVED\nDate: ${request.date}\nTime: ${request.time}\nReason: ${request.reason}`
//         }
//     ).then(
//         function(response) {
//             console.log("Email sent successfully:", response);
//             document.getElementById('leave-message').innerText = 
//                 `Approved and email sent to ${request.senderEmail}`;
//         },
//         function(error) {
//             console.error("Email failed:", error);
//             alert(`Failed to send email to ${request.senderEmail}. Error: ${error.text}`);
//         }
//     );
// }
// }

// function rejectLeave(index) {
// console.log('Rejecting request at index:', index);
// if (leaveRequests[index]) {
//     leaveRequests[index].status = 'Rejected';
//     leaveRequests[index].approved = false;
//     saveLeaveRequests();
    
//     // Send rejection email with status tracking
//     emailjs.send(
//         "service_nopqic4",
//         "template_ew9dt4z",
//         {
//             to_email: leaveRequests[index].senderEmail,
//             from_email: 'missionmoneyheist700@gmail.com',
//             subject: "Leave Request Rejected",
//             message: `
//                 Your leave request has been REJECTED
//                 Date: ${leaveRequests[index].date}
//                 Time: ${leaveRequests[index].time}
//                 Reason: ${leaveRequests[index].reason}
//             `
//         }
//     ).then(
//         function(response) {
//             console.log("EMAIL SENT SUCCESSFULLY", response);
//             document.getElementById('leave-message').innerText = 
//                 `Rejected and email sent to ${leaveRequests[index].senderEmail}`;
//         },
//         function(error) {
//             console.log("EMAIL FAILED", error);
//             document.getElementById('leave-message').innerText = 
//                 "Rejected but failed to send email notification";
//         }
//     );
    
//     updateLeaveRequestsTable();
// }
// }
    

//     // Replace the existing hod-approval-form event listener
//     document.getElementById('hod-approval-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const secretCode = document.getElementById('hod-secret-code').value;
//         if (secretCode === hodSecretCode) {
//             isHodVerified = true;
//             document.getElementById('leave-message').innerText = 'HOD access granted. You can now approve leave requests.';
//             updateLeaveRequestsTable();
//         } else {
//             document.getElementById('leave-message').innerText = 'Invalid HOD secret code';
//         }
//     });

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            document.getElementById('login-message').innerText = `Welcome, ${user.role}!`;
            // Show all sections after successful login
            document.querySelectorAll('.hidden').forEach(section => section.classList.remove('hidden'));
            document.getElementById('user-authentication').classList.add('hidden');

            // Show HOD approval form if the user is HOD
            if (user.role === 'HOD') {
                document.getElementById('hod-approval-form').classList.remove('hidden');
            }

            // Update leave requests table to show status
            // updateLeaveRequestsTable();
            // updateClassScheduleTable();
            isLoggedIn(user);
        } else {
            document.getElementById('login-message').innerText = 'Invalid email or password';
        }
    });

    

    

//     // Update class scheduling form handler
// document.getElementById('class-form').addEventListener('submit', function(event) {
// event.preventDefault();
// const className = document.getElementById('class-name').value;
// const teacherName = document.getElementById('teacher-name').value;
// const date = document.getElementById('class-date').value;

// // Schedule class
// const scheduledClass = {
//     className,
//     teacherName,
//     date
// };
// scheduledClasses.push(scheduledClass);
// saveScheduledClasses();

// // Update class schedule display
// updateClassScheduleTable();

// // Force refresh of free staff table
// refreshFreeStaffTable(date);

// // Show success message
// document.getElementById('class-message').innerText = 
//     `Class ${className} scheduled with ${teacherName}`;
// });

// // Add refresh function for free staff table
// function refreshFreeStaffTable(date) {
// const tableBody = document.getElementById('free-staff-table').querySelector('tbody');
// tableBody.innerHTML = '';

// // Get all staff members excluding scheduled ones
// const availableStaff = users.filter(user => {
//     const isStaff = user.role === 'staff';
//     const isScheduled = scheduledClasses.some(c => 
//         c.teacherName === user.name && 
//         c.date === date
//     );
//     const isOnLeave = leaveRequests.some(r => 
//         r.senderEmail === user.email && 
//         r.date === date && 
//         r.status === 'Approved'
//     );

//     return isStaff && !isScheduled && !isOnLeave;
// });

// if (availableStaff.length > 0) {
//     availableStaff.forEach(staff => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${staff.name}</td>
//             <td>${staff.email}</td>
//             <td>${staff.department}</td>
//             <td>Available</td>
//         `;
//         tableBody.appendChild(row);
//     });
// } else {
//     tableBody.innerHTML = `
//         <tr><td colspan="4">No available staff for selected date</td></tr>
//     `;
// }
// }

// // Add event listener for free staff form
// document.getElementById('free-staff-form').addEventListener('submit', function(event) {
// event.preventDefault();
// const date = document.getElementById('free-date').value;
// refreshFreeStaffTable(date);
// });
//     // Add event listener for free staff form
//     // Debug staff availability display
// // Update free staff check function
// // Add free staff check function
// document.getElementById('free-staff-form').addEventListener('submit', function(event) {
// event.preventDefault();
// const date = document.getElementById('free-date').value;
// const time = document.getElementById('free-time').value;

// // Only show staff who have explicitly set their availability
// const freeStaff = users.filter(user => {
//     // Only check staff members
//     const isStaff = user.role === 'staff';
    
//     // Check if staff has set availability
//     const hasSetAvailability = staffAvailability.some(a => 
//         a.staffId === user.id && 
//         a.date === date && 
//         a.time === time
//     );
    
//     // Check if not scheduled
//     const notScheduled = !scheduledClasses.some(c => 
//         c.teacherName === user.name && 
//         c.date === date
//     );
    
//     // Check if not on leave
//     const notOnLeave = !leaveRequests.some(r => 
//         r.senderEmail === user.email && 
//         r.date === date && 
//         r.status === 'Approved'
//     );
    
//     console.log(`${user.name}:`, {
//         isStaff,
//         hasSetAvailability,
//         notScheduled,
//         notOnLeave
//     });
    
//     return isStaff && hasSetAvailability && notScheduled && notOnLeave;
// });

// // Update table
// const tableBody = document.getElementById('free-staff-table').querySelector('tbody');
// tableBody.innerHTML = '';

// if (freeStaff.length > 0) {
//     freeStaff.forEach(staff => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${staff.name}</td>
//             <td>${staff.email}</td>
//             <td>${staff.department}</td>
//             <td>Available</td>
//         `;
//         tableBody.appendChild(row);
//     });
// } else {
//     tableBody.innerHTML = `
//         <tr>
//             <td colspan="4">No staff have set availability for selected date and time</td>
//         </tr>
//     `;
// }
// });
//     document.getElementById('update-availability-form').addEventListener('submit', function(event) {
// event.preventDefault();
// const staffId = document.getElementById('staff-id').value;
// const staffName = document.getElementById('staff-name').value;
// const newDate = document.getElementById('new-availability-date').value;
// const newTime = document.getElementById('new-availability-time').value;

// const availability = {
//     staffId,
//     staffName,
//     date: newDate,
//     time: newTime,
//     isAvailable: true
// };
// window.addEventListener('storage', function(e) {
// if (e.key === 'leaveRequests') {
//     // Update leave requests from storage
//     leaveRequests = JSON.parse(e.newValue) || [];
//     updateLeaveRequestsTable();
// }
// if (e.key === 'staffAvailability') {
//     // Update staff availability from storage
//     staffAvailability = JSON.parse(e.newValue) || [];
//     const currentDate = document.getElementById('free-date')?.value;
//     if (currentDate) {
//         updateFreeStaffTable(currentDate);
//     }
// }
// if (e.key === 'scheduledClasses') {
//     // Update scheduled classes from storage
//     scheduledClasses = JSON.parse(e.newValue) || [];
//     updateClassScheduleTable();
// }
// });

// // Update availability
// const index = staffAvailability.findIndex(a => a.staffId === staffId);
// if (index > -1) {
//     staffAvailability.splice(index, 1);
// }
// staffAvailability.push(availability);
// saveStaffAvailability();

// // Update free staff table
// updateFreeStaffTable(newDate, newTime);

// document.getElementById('update-availability-message').innerText = 
//     `Availability updated for ${staffName}`;
// });
//     // Add function to display free staff
//     function updateFreeStaffTable(date) {
//         const tableBody = document.getElementById('free-staff-table').querySelector('tbody');
//         tableBody.innerHTML = '';

//         // Filter available staff
//         const availableStaff = users.filter(user => {
//             const isStaff = user.role === 'staff';
//             const isScheduled = scheduledClasses.some(c => 
//                 c.teacherName === user.name && 
//                 c.date === date
//             );
//             return isStaff && !isScheduled;
//         });

//         // Display available staff
//         if (availableStaff.length > 0) {
//             availableStaff.forEach(staff => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${staff.name}</td>
//                     <td>${staff.email}</td>
//                     <td>${staff.department}</td>
//                     <td>Available</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         } else {
//             tableBody.innerHTML = `
//                 <tr>
//                     <td colspan="4">No available staff for selected date</td>
//                 </tr>
//             `;
//         }
//     }
//     document.getElementById('update-availability-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const staffId = document.getElementById('staff-id').value;
//         const staffName = document.getElementById('staff-name').value;
//         const newDate = document.getElementById('new-availability-date').value;
//         const newTime = document.getElementById('new-availability-time').value;
        
//         const availability = {
//             staffId,
//             staffName,
//             date: newDate,
//             time: newTime
//         };
        
//         // Remove old availability for this staff
//         const index = staffAvailability.findIndex(a => a.staffId === staffId);
//         if (index > -1) {
//             staffAvailability.splice(index, 1);
//         }
        
//         staffAvailability.push(availability);
//         saveStaffAvailability();
        
//         document.getElementById('update-availability-message').innerText = 
//             `Availability updated for ${staffName} to ${newDate} at ${newTime}`;
//     });
//     // Set minimum date to today
//     document.getElementById('leave-date').min = new Date().toISOString().split('T')[0];

//     // Add this after the leave form HTML and before other scripts

//     document.getElementById('leave-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const senderEmail = document.getElementById('leave-sender-email').value;
//         const receiverEmail = 'missionmoneyheist700@gmail.com';
//         const reason = document.getElementById('leave-reason').value;
//         const date = document.getElementById('leave-date').value;
//         const leaveType = document.getElementById('leave-type').value;

//         // Send email using EmailJS
//         emailjs.send(
//             "service_nopqic4",
//             "template_ew9dt4z",
//             {
//                 to_email: receiverEmail,
//                 from_email: senderEmail,
//                 subject: "Leave Request",
//                 message: `
//                     Leave Request Details:
//                     From: ${senderEmail}
//                     Reason: ${reason}
//                     Date: ${date}
//                 `
//             }
//         ).then(
//             function(response) {
//                 console.log("SUCCESS", response);
//                 document.getElementById('leave-message').innerText = 
//                     `Email sent successfully to ${receiverEmail}! Check your inbox.`;
                
//                 // Save to localStorage after successful email
//                 const leaveRequest = {
//                     senderEmail,
//                     receiverEmail,
//                     reason,
//                     date,
//                     leaveType,
//                     status: 'Pending',
//                     approved: false
//                 };
//                 leaveRequests.push(leaveRequest);
//                 saveLeaveRequests();
//                 console.log('New leave request added:', leaveRequest);
//                 updateLeaveRequestsTable();
//             },
//             function(error) {
//                 console.log("FAILED", error);
//                 document.getElementById('leave-message').innerText = 
//                     "Failed to send email. Please try again.";
//             }
//         );
//     });

// // Update table display function
// // function updateLeaveRequestsTable() {
// // const tableBody = document.getElementById('leave-requests-table').querySelector('tbody');
// // tableBody.innerHTML = '';
// // leaveRequests.forEach((request, index) => {
// //     const status = request.status || 'Pending';
// //     const row = document.createElement('tr');
// //     row.innerHTML = `
// //         <td>${request.senderEmail}</td>
// //         <td>${request.reason}</td>
// //         <td>${request.date}</td>
// //         <td>${request.leaveType === 'full' ? 'Full Day' : 'Half Day'}</td>
// //         ${isHodVerified ? 
// //             `<td>
// //                 <button onclick="window.approveLeave(${index})" 
// //                         class="approve-btn" 
// //                         ${status !== 'Pending' ? 'disabled' : ''}>
// //                     Approve
// //                 </button>
// //                 <button onclick="window.rejectLeave(${index})" 
// //                         class="reject-btn" 
// //                         ${status !== 'Pending' ? 'disabled' : ''}>
// //                     Reject
// //                 </button>
// //             </td>` 
// //             : '<td></td>'}
// //         <td class="status-${status.toLowerCase()}">${status}</td>
// //     `;
// //     tableBody.appendChild(row);
// // });
// // }
// // Current leave request email flow:
// // function sendLeaveRequestEmail(request) {
// // emailjs.send(
// //     "service_nopqic4", 
// //     "template_ew9dt4z",
// //     {
// //         to_email: 'missionmoneyheist700@gmail.com', // HOD receives initial request
// //         from_email: request.senderEmail,
// //         subject: "Leave Request",
// //         message: `
// //             Leave Request Details:
// //             From: ${request.senderEmail}
// //             Reason: ${request.reason}
// //             Date: ${request.date}
// //             Time: ${request.time}
// //         `
// //     }
// // );
// // }
// // Add status update email
// // function sendStatusUpdateEmail(request, status) {
// // emailjs.send(
// //     "service_nopqic4",
// //     "template_ew9dt4z",
// //     {
// //         to_email: request.senderEmail, // Staff member receives approval/rejection
// //         from_email: 'missionmoneyheist700@gmail.com',
// //         subject: `Leave Request ${status}`,
// //         message: `
// //             Your leave request has been ${status}
// //             Date: ${request.date}
// //             Time: ${request.time}
// //             Reason: ${request.reason}
// //         `
// //     }
// // );

// }
// (function() {
//     emailjs.init("A8bRTqDap2xiZltpj");
//     console.log("EmailJS initialized");
// })();
// // Add EmailJS initialization at the top of your script
// (async function initializeEmailJS() {
//     try {
//         await emailjs.init("A8bRTqDap2xiZltpj");
//         console.log("EmailJS initialized successfully");
//     } catch (err) {
//         console.error("EmailJS initialization failed:", err);
//     }
// })();
// function testEmailSending() {
//     const testData = {
//         to_email: "test@example.com",
//         from_email: "missionmoneyheist700@gmail.com",
//         subject: "Test Email",
//         message: "This is a test email"
//     };
    
//     emailjs.send("service_nopqic4", "template_ew9dt4z", testData)
//         .then(
//             response => console.log("Test email sent", response),
//             error => console.error("Test email failed", error)
//         );
// }
// // Add this to your script section

// // Function to set minimum date for all date inputs
// function setMinDates() {
// const today = new Date().toISOString().split('T')[0];
// const dateInputs = [
//     document.getElementById('leave-date'),
//     document.getElementById('free-date'),
//     document.getElementById('new-availability-date')
// ];

// dateInputs.forEach(input => {
//     if (input) {
//         input.min = today;
//     }
// });
// }

// // Call setMinDates when page loads
// document.addEventListener('DOMContentLoaded', setMinDates);

// // Update free staff form validation
// document.getElementById('free-staff-form').addEventListener('submit', function(event) {
// event.preventDefault();
// const date = document.getElementById('free-date').value;
// const today = new Date().toISOString().split('T')[0];

// if (date < today) {
//     alert('Please select today or a future date');
//     return;
// }

// refreshFreeStaffTable(date);
// });


// leave
async function getLeaveDetails(user) {
    try {
      const response = await fetch('https://leave-management-api.sandursaiganesh21.workers.dev/leaves');
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const leaveRequests = await response.json();
      populateLeaveTable(leaveRequests,user);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      displayMessage("Error fetching leave requests.", true); // Display error message
    }
  }
  
  function populateLeaveTable(leaveRequests,user) {
    const tbody = document.getElementById('leave-requests-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
  
    leaveRequests.forEach((leaveRequest, index) => { // Use forEach and index
      const row = tbody.insertRow();
      row.dataset.id = leaveRequest.id; // Store ID as data attribute
      const emailCell = row.insertCell();
      emailCell.textContent = leaveRequest.from_email;
      const reasonCell = row.insertCell();
      reasonCell.textContent = leaveRequest.reason;
      const dateCell = row.insertCell();
      dateCell.textContent = leaveRequest.date;
      const leaveTypeCell = row.insertCell();
      leaveTypeCell.textContent = leaveRequest.leave_type === 'full' ? 'Full Day' : 'Half Day';
      const statusCell = row.insertCell();
      statusCell.textContent = leaveRequest.status;
  
      if (isHod(user) && leaveRequest.status === 'pending') {
        const approvalCell = row.insertCell();
        approvalCell.classList.add('approval-column');
        const approveButton = createActionButton('Approve', leaveRequest.id, 'approved');
        const rejectButton = createActionButton('Reject', leaveRequest.id, 'rejected');
        approvalCell.append(approveButton, rejectButton);
      }
    });
  }
  
  function createActionButton(text, leaveId, newStatus) {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', async () => {
        try {
          const response = await fetch(`https://leave-management-api.sandursaiganesh21.workers.dev/leaves/${leaveId}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          getLeaveDetails(); // Refresh table
          location.reload()
        } catch (error) {
          console.error(`Error ${text.toLowerCase()}ing leave:`, error);
          displayMessage(`Error ${text.toLowerCase()}ing leave.`, true);
        }
      });
      return button;
    }
  
  async function submitLeaveRequest(formData) {
    try {
      const response = await fetch('https://leave-management-api.sandursaiganesh21.workers.dev/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      displayMessage('Leave request submitted successfully!');
      document.getElementById('leave-form').reset();
      getLeaveDetails();
      location.reload()
    } catch (error) {
      console.error("Error submitting leave:", error);
      displayMessage("Failed to submit leave request.", true);
    }
  }
  
  function isHod(user) {
    // Replace with your actual HOD check logic
    return user.role==='HOD'
  }
  
  function displayMessage(message, isError = false) {
      const messageDiv = document.getElementById('leave-message');
      messageDiv.textContent = message;
      messageDiv.className = isError ? 'error-message' : 'success-message'; // Add CSS classes for styling
  }
  
  function isLoggedIn(user){
    const leaveForm = document.getElementById('leave-form');
    leaveForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = {
        from_email: leaveForm.elements['leave-sender-email'].value,
        leave_type: leaveForm.elements['leave-type'].value,
        reason: leaveForm.elements['leave-reason'].value,
        date: leaveForm.elements['leave-date'].value,
      };
      submitLeaveRequest(formData);
    });
  
    getLeaveDetails(user);
  }
//   document.addEventListener('DOMContentLoaded', () => {
//     const leaveForm = document.getElementById('leave-form');
//     leaveForm.addEventListener('submit', (event) => {
//       event.preventDefault();
//       const formData = {
//         from_email: leaveForm.elements['leave-sender-email'].value,
//         leave_type: leaveForm.elements['leave-type'].value,
//         reason: leaveForm.elements['leave-reason'].value,
//         date: leaveForm.elements['leave-date'].value,
//       };
//       submitLeaveRequest(formData);
//     });
  
//     getLeaveDetails(); // Load leave details on page load
//   });