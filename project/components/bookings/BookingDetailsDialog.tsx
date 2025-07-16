'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar,
  Users,
  IndianRupee,
  Phone,
  Mail,
  MapPin,
  FileText
} from 'lucide-react'
import { Booking } from '@/types'
import { formatDate, formatCurrency } from '@/lib/utils'

interface BookingDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: Booking | null
}

export function BookingDetailsDialog({ 
  open, 
  onOpenChange, 
  booking 
}: BookingDetailsDialogProps) {
  if (!booking) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default'
      case 'checked_in': return 'success'
      case 'checked_out': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'refunded': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge variant={getStatusColor(booking.status)}>
              {booking.status.replace('_', ' ')}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Booking Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="font-medium">{booking.booking_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{formatDate(booking.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <Badge variant={getPaymentStatusColor(booking.payment_status)} className="text-xs">
                    {booking.payment_status}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Stay Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{booking.number_of_guests} guests</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground">Room:</span>
                  <span className="ml-2 font-medium">
                    {booking.room?.room_number} ({booking.room?.room_type})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Info */}
          <div>
            <h3 className="font-semibold mb-2">Guest Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-muted-foreground w-20">Name:</span>
                  <span className="font-medium">
                    {booking.guest?.first_name} {booking.guest?.last_name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{booking.guest?.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{booking.guest?.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  <span>
                    {booking.guest?.address}, {booking.guest?.city}, {booking.guest?.state}
                  </span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{booking.guest?.id_type}: {booking.guest?.id_number}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div>
            <h3 className="font-semibold mb-2">Payment Breakdown</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(booking.total_amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>{formatCurrency(booking.gst_amount)}</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2">
                <span>Total Amount:</span>
                <span>{formatCurrency(booking.final_amount)}</span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.special_requests && (
            <div>
              <h3 className="font-semibold mb-2">Special Requests</h3>
              <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                {booking.special_requests}
              </p>
            </div>
          )}

          {/* Room Amenities */}
          {booking.room?.amenities && booking.room.amenities.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Room Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {booking.room.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            Generate Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}