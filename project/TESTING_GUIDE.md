# 🧪 GUI Testing Guide - Homestay Management System

## 🚀 **Quick Start Testing**

### **Step 1: Initial Setup & Login**
1. Open the application in your browser
2. You should see a login screen with "Homestay Manager" title
3. **Test Login:**
   - Email: `admin@homestay.com` (pre-filled)
   - Password: `password` (pre-filled)
   - Click "Sign In" button
   - ✅ **Expected:** Dashboard loads successfully

---

## 📋 **Feature-by-Feature GUI Testing**

### **🏠 1. DASHBOARD TESTING**

**What to Test:**
- [ ] Dashboard loads with welcome message
- [ ] 4 metric cards show data (Room Occupancy, Today's Revenue, Monthly Revenue, Guest Rating)
- [ ] Room Status Overview shows available/occupied/maintenance counts
- [ ] Recent Activity section shows sample activities
- [ ] Quick Actions section has 4 clickable cards
- [ ] All numbers and percentages display correctly

**Visual Check:**
- [ ] Cards have proper spacing and shadows
- [ ] Icons display correctly in each card
- [ ] Colors are consistent (green for positive metrics, etc.)
- [ ] Text is readable and properly aligned

---

### **🛏️ 2. ROOMS MANAGEMENT TESTING**

**Navigation:** Click "Rooms" in sidebar

**Test Adding a Room:**
1. Click "Add Room" button (top right)
2. Fill the form:
   - Room Number: `301`
   - Room Type: Select "Deluxe"
   - Rate per Night: `3500`
   - Max Occupancy: `4`
   - Amenities: `WiFi, AC, TV, Mini Bar, Balcony`
   - Description: `Spacious deluxe room with city view`
3. Click "Add Room"
4. ✅ **Expected:** Modal closes, new room appears in grid

**Test Room Features:**
- [ ] Room cards display all information correctly
- [ ] Status badges show correct colors (Available=green, Occupied=blue, Maintenance=red)
- [ ] "View" and "Edit" buttons work on each card
- [ ] Search box filters rooms by number/type
- [ ] Status filter dropdown works
- [ ] Type filter dropdown works

**Test Editing a Room:**
1. Click "Edit" on any room card
2. Change the rate to `4000`
3. Add "Breakfast" to amenities
4. Click "Update"
5. ✅ **Expected:** Room card updates with new information

---

### **👥 3. GUESTS MANAGEMENT TESTING**

**Navigation:** Click "Guests" in sidebar

**Test Adding a Guest:**
1. Click "Add Guest" button
2. Fill the form with sample data:
   - First Name: `Priya`
   - Last Name: `Sharma`
   - Email: `priya.sharma@email.com`
   - Phone: `+91 9876543210`
   - ID Type: Select "Aadhar Card"
   - ID Number: `1234 5678 9012`
   - Address: `123 Anna Salai`
   - City: `Chennai`
   - State: `Tamil Nadu`
   - Country: `India`
   - Date of Birth: Select any date
   - Nationality: `Indian`
3. Click "Add Guest"
4. ✅ **Expected:** Guest appears in the grid

**Test Guest Features:**
- [ ] Guest cards show all information
- [ ] Search functionality works
- [ ] "View" and "Edit" buttons are clickable
- [ ] Emergency contact section displays if filled

---

### **📅 4. BOOKINGS MANAGEMENT TESTING**

**Navigation:** Click "Bookings" in sidebar

**Test Creating a Booking:**
1. Click "New Booking" button
2. Fill the booking form:
   - Guest: Select the guest you created
   - Room: Select an available room
   - Check-in Date: Tomorrow's date
   - Check-out Date: 3 days from tomorrow
   - Number of Guests: `2`
   - Special Requests: `Late check-in requested`
3. ✅ **Expected:** Booking summary shows correct calculations
4. Click "Create Booking"
5. ✅ **Expected:** Booking appears in the list

**Test Booking Features:**
- [ ] Booking cards show guest name, room, dates, amount
- [ ] Status badges display correctly
- [ ] Search filters bookings
- [ ] Status filter works
- [ ] "View" button opens booking details

---

### **💳 5. PAYMENTS TESTING**

**Navigation:** Click "Payments" in sidebar

**Visual Verification:**
- [ ] Summary cards show Total Revenue, Pending Payments, Total Transactions
- [ ] Payment list shows sample payment data
- [ ] Payment method icons display (UPI, Card, Cash icons)
- [ ] Status badges show correct colors
- [ ] GST amounts are calculated and displayed
- [ ] "View" and "Download" buttons are present

**Test Filters:**
- [ ] Search box filters payments
- [ ] Status filter dropdown works
- [ ] Payment method filter works

---

### **🔧 6. MAINTENANCE TESTING**

**Navigation:** Click "Maintenance" in sidebar

**Test Adding Maintenance Task:**
1. Click "Add Task" button
2. Fill the form:
   - Room: Select any room
   - Type: Select "Cleaning"
   - Description: `Deep cleaning after checkout`
   - Assigned To: `Housekeeping Staff`
   - Priority: Select "Medium"
   - Scheduled Date: Today's date
   - Cost: `500`
3. Click "Add Task"
4. ✅ **Expected:** Task appears in the list

**Visual Verification:**
- [ ] Summary cards show task counts and total cost
- [ ] Priority badges show correct colors (Urgent=red, High=orange, etc.)
- [ ] Status icons display correctly
- [ ] All filters work properly

---

### **📋 7. COMPLIANCE TESTING**

**Navigation:** Click "Compliance" in sidebar

**Visual Verification:**
- [ ] Summary cards show document counts by status
- [ ] Document cards display with appropriate icons
- [ ] Status badges show correct colors (Valid=green, Expired=red)
- [ ] Expiry dates are highlighted if approaching
- [ ] "View" and "Download" buttons are present

**Test Adding Document:**
1. Click "Add Document" button
2. Fill the form:
   - Document Type: Select "Tourism License"
   - Document Name: `TN Tourism License 2024`
   - Document URL: `https://example.com/license.pdf`
   - Issuing Authority: `Tamil Nadu Tourism Department`
   - Issue Date: Current date
   - Expiry Date: One year from now
   - Reminder Days: `30`
3. Click "Add Document"
4. ✅ **Expected:** Document appears in grid

---

### **📊 8. ANALYTICS TESTING**

**Navigation:** Click "Analytics" in sidebar

**Visual Verification:**
- [ ] Key metrics cards display with correct icons
- [ ] Tab navigation works (Revenue Trends, Occupancy, Room Distribution)
- [ ] Charts render properly:
  - Revenue Trends: Bar chart with monthly data
  - Occupancy: Line chart with daily data
  - Room Distribution: Pie chart with room types
- [ ] Charts are responsive and interactive
- [ ] Insights section shows colored insight cards

**Test Chart Interactions:**
- [ ] Hover over chart elements shows tooltips
- [ ] Charts resize when browser window changes
- [ ] Tab switching works smoothly

---

### **👨‍💼 9. STAFF MANAGEMENT TESTING**

**Navigation:** Click "Staff" in sidebar

**Test Adding Staff:**
1. Click "Add Staff" button
2. Fill the form:
   - Name: `Ravi Kumar`
   - Email: `ravi@homestay.com`
   - Phone: `+91 9876543211`
   - Role: Select "Reception"
   - Department: `Front Office`
   - Hire Date: Current date
   - Salary: `25000`
   - Check some permissions
3. Click "Add Staff"
4. ✅ **Expected:** Staff member appears in grid

**Visual Verification:**
- [ ] Summary cards show staff counts and payroll
- [ ] Staff cards show all information
- [ ] Role badges display with correct colors
- [ ] Permission tags are visible
- [ ] Filters work correctly

---

## 📱 **MOBILE RESPONSIVENESS TESTING**

**Test Mobile Layout:**
1. Resize browser window to phone width (375px)
2. ✅ **Expected Results:**
   - [ ] Sidebar collapses to hamburger menu
   - [ ] Hamburger menu opens/closes sidebar
   - [ ] Cards stack vertically
   - [ ] Tables scroll horizontally
   - [ ] Forms remain usable
   - [ ] Buttons are touch-friendly
   - [ ] Text remains readable

---

## 🌐 **LANGUAGE TOGGLE TESTING**

**Test Tamil Translation:**
1. Look for language toggle in header (Globe icon)
2. Click to switch to Tamil
3. ✅ **Expected:** UI text changes to Tamil
4. Click again to switch back to English
5. ✅ **Expected:** UI text returns to English

---

## 🎨 **VISUAL CONSISTENCY TESTING**

**Check Throughout App:**
- [ ] Colors are consistent (blue primary, green success, red error)
- [ ] Fonts are uniform
- [ ] Spacing is consistent
- [ ] Icons are properly aligned
- [ ] Buttons have hover effects
- [ ] Cards have consistent shadows
- [ ] Loading states appear during actions
- [ ] Success/error messages show appropriately

---

## ⚡ **PERFORMANCE TESTING**

**Quick Performance Checks:**
- [ ] Pages load quickly (under 2 seconds)
- [ ] Smooth transitions between pages
- [ ] No flickering or layout shifts
- [ ] Forms submit without delay
- [ ] Charts render smoothly
- [ ] Search results appear instantly

---

## 🐛 **ERROR HANDLING TESTING**

**Test Form Validation:**
1. Try submitting empty forms
2. ✅ **Expected:** Red error messages appear
3. Enter invalid email formats
4. ✅ **Expected:** Email validation error shows
5. Try invalid date ranges (checkout before checkin)
6. ✅ **Expected:** Date validation error shows

---

## ✅ **FINAL CHECKLIST**

After completing all tests above:

- [ ] All pages load without errors
- [ ] All forms can be submitted successfully
- [ ] All buttons and links work
- [ ] Data persists after page refresh
- [ ] Mobile layout works properly
- [ ] Language toggle functions
- [ ] Charts and analytics display correctly
- [ ] Search and filters work on all pages
- [ ] No console errors in browser developer tools

---

## 🎯 **Quick 5-Minute Test**

If you want a quick overall test:

1. **Login** → Dashboard loads ✅
2. **Add Room** → Room 401, Deluxe, ₹4000 ✅
3. **Add Guest** → Sample guest with full details ✅
4. **Create Booking** → Book the room for guest ✅
5. **Check Analytics** → Charts display data ✅
6. **Test Mobile** → Resize window, check responsiveness ✅

If all 6 steps work, the core functionality is working properly!

---

## 📞 **Need Help?**

If any test fails or you encounter issues:
1. Check browser console for errors (F12 → Console tab)
2. Try refreshing the page
3. Clear browser cache if needed
4. Report specific error messages for debugging

**Happy Testing! 🚀**