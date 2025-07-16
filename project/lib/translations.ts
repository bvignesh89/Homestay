import { Translation } from '@/types'

export const translations: Translation = {
  // Navigation
  dashboard: { en: 'Dashboard', ta: 'டாஷ்போர்டு' },
  rooms: { en: 'Rooms', ta: 'அறைகள்' },
  bookings: { en: 'Bookings', ta: 'முன்பதிவுகள்' },
  guests: { en: 'Guests', ta: 'விருந்தினர்கள்' },
  payments: { en: 'Payments', ta: 'பணம் செலுத்துதல்' },
  maintenance: { en: 'Maintenance', ta: 'பராமரிப்பு' },
  compliance: { en: 'Compliance', ta: 'இணக்கம்' },
  analytics: { en: 'Analytics', ta: 'பகுப்பாய்வு' },
  staff: { en: 'Staff', ta: 'ஊழியர்கள்' },
  
  // Common actions
  add: { en: 'Add', ta: 'சேர்' },
  edit: { en: 'Edit', ta: 'திருத்து' },
  delete: { en: 'Delete', ta: 'நீக்கு' },
  save: { en: 'Save', ta: 'சேமி' },
  cancel: { en: 'Cancel', ta: 'ரத்து செய்' },
  search: { en: 'Search', ta: 'தேடு' },
  filter: { en: 'Filter', ta: 'வடிகட்டு' },
  
  // Room management
  room_number: { en: 'Room Number', ta: 'அறை எண்' },
  room_type: { en: 'Room Type', ta: 'அறை வகை' },
  rate_per_night: { en: 'Rate per Night', ta: 'ஒரு இரவுக்கான கட்டணம்' },
  amenities: { en: 'Amenities', ta: 'வசதிகள்' },
  status: { en: 'Status', ta: 'நிலை' },
  available: { en: 'Available', ta: 'கிடைக்கும்' },
  occupied: { en: 'Occupied', ta: 'ஆக்கிரமிக்கப்பட்ட' },
  maintenance_status: { en: 'Maintenance', ta: 'பராமரிப்பு' },
  
  // Booking
  check_in: { en: 'Check In', ta: 'செக் இன்' },
  check_out: { en: 'Check Out', ta: 'செக் அவுட்' },
  guest_name: { en: 'Guest Name', ta: 'விருந்தினர் பெயர்' },
  booking_id: { en: 'Booking ID', ta: 'முன்பதிவு ஐடி' },
  total_amount: { en: 'Total Amount', ta: 'மொத்த தொகை' },
  
  // Guest information
  first_name: { en: 'First Name', ta: 'முதல் பெயர்' },
  last_name: { en: 'Last Name', ta: 'கடைசி பெயர்' },
  email: { en: 'Email', ta: 'மின்னஞ்சல்' },
  phone: { en: 'Phone', ta: 'தொலைபேசி' },
  address: { en: 'Address', ta: 'முகவரி' },
  id_verification: { en: 'ID Verification', ta: 'அடையாள சரிபார்ப்பு' },
  
  // Tamil Nadu specific
  tn_tourism_license: { en: 'TN Tourism License', ta: 'தமிழ்நாடு சுற்றுலா உரிமம்' },
  fire_safety_certificate: { en: 'Fire Safety Certificate', ta: 'தீ பாதுகாப்பு சான்றிதழ்' },
  building_plan_approval: { en: 'Building Plan Approval', ta: 'கட்டிட திட்ட ஒப்புதல்' },
  
  // Status messages
  booking_confirmed: { en: 'Booking Confirmed', ta: 'முன்பதிவு உறுதி செய்யப்பட்டது' },
  payment_successful: { en: 'Payment Successful', ta: 'பணம் செலுத்துதல் வெற்றிகரமாக' },
  room_cleaned: { en: 'Room Cleaned', ta: 'அறை சுத்தம் செய்யப்பட்டது' },
}

export const useTranslation = (language: 'en' | 'ta' = 'en') => {
  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }
  
  return { t }
}