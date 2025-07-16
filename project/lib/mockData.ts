import { Room, Guest, Booking, Payment, MaintenanceLog, Staff, ComplianceDocument } from '@/types'

// Mock data for development
export const mockRooms: Room[] = [
  {
    id: '1',
    room_number: '101',
    room_type: 'single',
    rate_per_night: 2000,
    amenities: ['WiFi', 'AC', 'TV', 'Breakfast'],
    status: 'available',
    max_occupancy: 2,
    description: 'Cozy single room with garden view',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    room_number: '102',
    room_type: 'double',
    rate_per_night: 3000,
    amenities: ['WiFi', 'AC', 'TV', 'Breakfast', 'Balcony'],
    status: 'occupied',
    max_occupancy: 4,
    description: 'Spacious double room with city view',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    room_number: '201',
    room_type: 'deluxe',
    rate_per_night: 4500,
    amenities: ['WiFi', 'AC', 'TV', 'Breakfast', 'Balcony', 'Mini Bar'],
    status: 'available',
    max_occupancy: 4,
    description: 'Deluxe room with premium amenities',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockGuests: Guest[] = [
  {
    id: '1',
    first_name: 'Rajesh',
    last_name: 'Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    id_type: 'aadhar',
    id_number: '1234 5678 9012',
    address: '123 Main Street',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    date_of_birth: '1985-06-15',
    nationality: 'Indian',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockBookings: Booking[] = [
  {
    id: '1',
    booking_id: 'HSB123456',
    guest_id: '1',
    room_id: '2',
    check_in_date: '2024-01-15',
    check_out_date: '2024-01-18',
    number_of_guests: 2,
    total_amount: 9000,
    gst_amount: 1620,
    final_amount: 10620,
    status: 'checked_in',
    payment_status: 'paid',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockPayments: Payment[] = [
  {
    id: '1',
    booking_id: '1',
    amount: 9000,
    gst_amount: 1620,
    total_amount: 10620,
    payment_method: 'upi',
    payment_status: 'completed',
    transaction_id: 'TXN123456789',
    invoice_number: 'INV202401001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockMaintenanceLogs: MaintenanceLog[] = [
  {
    id: '1',
    room_id: '3',
    type: 'cleaning',
    description: 'Deep cleaning required after checkout',
    assigned_to: 'Priya Housekeeping',
    status: 'completed',
    priority: 'medium',
    scheduled_date: '2024-01-10',
    completed_date: '2024-01-10',
    cost: 500,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@homestay.com',
    phone: '+91 9876543211',
    role: 'manager',
    department: 'Operations',
    hire_date: '2023-01-15',
    salary: 35000,
    status: 'active',
    permissions: ['manage_rooms', 'manage_bookings', 'view_analytics'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockComplianceDocuments: ComplianceDocument[] = [
  {
    id: '1',
    document_type: 'tourism_license',
    document_name: 'Tamil Nadu Tourism License 2024',
    document_url: 'https://example.com/tourism-license.pdf',
    issue_date: '2024-01-01',
    expiry_date: '2024-12-31',
    issuing_authority: 'Tamil Nadu Tourism Department',
    status: 'valid',
    reminder_days: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]