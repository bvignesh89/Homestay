export interface Room {
  id: string
  room_number: string
  room_type: 'single' | 'double' | 'deluxe' | 'suite'
  rate_per_night: number
  amenities: string[]
  status: 'available' | 'occupied' | 'maintenance'
  max_occupancy: number
  description?: string
  images?: string[]
  created_at: string
  updated_at: string
}

export interface Guest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  id_type: 'aadhar' | 'passport' | 'driving_license' | 'voter_id'
  id_number: string
  id_document_url?: string
  address: string
  city: string
  state: string
  country: string
  date_of_birth: string
  nationality: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  booking_id: string
  guest_id: string
  room_id: string
  check_in_date: string
  check_out_date: string
  number_of_guests: number
  total_amount: number
  gst_amount: number
  final_amount: number
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  special_requests?: string
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
  guest?: Guest
  room?: Room
}

export interface Payment {
  id: string
  booking_id: string
  amount: number
  gst_amount: number
  total_amount: number
  payment_method: 'upi' | 'razorpay' | 'cash' | 'card'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  razorpay_payment_id?: string
  invoice_number: string
  created_at: string
  updated_at: string
}

export interface MaintenanceLog {
  id: string
  room_id: string
  type: 'cleaning' | 'repair' | 'inspection' | 'maintenance'
  description: string
  assigned_to: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  scheduled_date: string
  completed_date?: string
  cost?: number
  notes?: string
  created_at: string
  updated_at: string
  room?: Room
}

export interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'manager' | 'housekeeping' | 'maintenance' | 'reception'
  department: string
  hire_date: string
  salary?: number
  status: 'active' | 'inactive'
  permissions: string[]
  created_at: string
  updated_at: string
}

export interface ComplianceDocument {
  id: string
  document_type: 'building_plan' | 'fire_safety' | 'health_license' | 'tourism_license' | 'gst_certificate' | 'other'
  document_name: string
  document_url: string
  issue_date: string
  expiry_date?: string
  issuing_authority: string
  status: 'valid' | 'expired' | 'pending_renewal'
  reminder_days: number
  created_at: string
  updated_at: string
}

export interface Analytics {
  occupancy_rate: number
  revenue_today: number
  revenue_month: number
  total_bookings: number
  average_rating: number
  rooms_occupied: number
  rooms_available: number
  rooms_maintenance: number
}