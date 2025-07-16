'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Booking, Room, Guest } from '@/types'
import { supabase } from '@/lib/supabase'
import { generateBookingId, calculateGST } from '@/lib/utils'

const bookingSchema = z.object({
  guest_id: z.string().min(1, 'Guest is required'),
  room_id: z.string().min(1, 'Room is required'),
  check_in_date: z.string().min(1, 'Check-in date is required'),
  check_out_date: z.string().min(1, 'Check-out date is required'),
  number_of_guests: z.number().min(1, 'Number of guests must be at least 1'),
  special_requests: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface AddBookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBookingAdded: (booking: Booking) => void
}

export function AddBookingDialog({ 
  open, 
  onOpenChange, 
  onBookingAdded 
}: AddBookingDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      number_of_guests: 1,
    }
  })

  useEffect(() => {
    if (open) {
      loadRoomsAndGuests()
    }
  }, [open])

  const loadRoomsAndGuests = async () => {
    try {
      const [roomsResult, guestsResult] = await Promise.all([
        supabase.from('rooms').select('*').eq('status', 'available'),
        supabase.from('guests').select('*').order('first_name')
      ])

      if (roomsResult.data) setRooms(roomsResult.data)
      if (guestsResult.data) setGuests(guestsResult.data)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      if (!selectedRoom) throw new Error('Room not selected')

      const checkInDate = new Date(data.check_in_date)
      const checkOutDate = new Date(data.check_out_date)
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
      
      const totalAmount = selectedRoom.rate_per_night * nights
      const gstAmount = calculateGST(totalAmount)
      const finalAmount = totalAmount + gstAmount

      const bookingData = {
        booking_id: generateBookingId(),
        guest_id: data.guest_id,
        room_id: data.room_id,
        check_in_date: data.check_in_date,
        check_out_date: data.check_out_date,
        number_of_guests: data.number_of_guests,
        total_amount: totalAmount,
        gst_amount: gstAmount,
        final_amount: finalAmount,
        status: 'confirmed',
        payment_status: 'pending',
        special_requests: data.special_requests,
      }

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select(`
          *,
          guest:guests(*),
          room:rooms(*)
        `)
        .single()

      if (error) throw error

      onBookingAdded(booking)
      onOpenChange(false)
      reset()
    } catch (error) {
      console.error('Error creating booking:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoomChange = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId)
    setSelectedRoom(room || null)
    setValue('room_id', roomId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guest_id">Guest</Label>
              <Select onValueChange={(value) => setValue('guest_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guest" />
                </SelectTrigger>
                <SelectContent>
                  {guests.map((guest) => (
                    <SelectItem key={guest.id} value={guest.id}>
                      {guest.first_name} {guest.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.guest_id && (
                <p className="text-sm text-red-500">{errors.guest_id.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="room_id">Room</Label>
              <Select onValueChange={handleRoomChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.room_number} - {room.room_type} (₹{room.rate_per_night}/night)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.room_id && (
                <p className="text-sm text-red-500">{errors.room_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="check_in_date">Check-in Date</Label>
              <Input
                id="check_in_date"
                type="date"
                {...register('check_in_date')}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.check_in_date && (
                <p className="text-sm text-red-500">{errors.check_in_date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="check_out_date">Check-out Date</Label>
              <Input
                id="check_out_date"
                type="date"
                {...register('check_out_date')}
                min={watch('check_in_date') || new Date().toISOString().split('T')[0]}
              />
              {errors.check_out_date && (
                <p className="text-sm text-red-500">{errors.check_out_date.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="number_of_guests">Number of Guests</Label>
            <Input
              id="number_of_guests"
              type="number"
              {...register('number_of_guests', { valueAsNumber: true })}
              min="1"
              max={selectedRoom?.max_occupancy || 10}
            />
            {errors.number_of_guests && (
              <p className="text-sm text-red-500">{errors.number_of_guests.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              {...register('special_requests')}
              placeholder="Any special requests or notes..."
              rows={3}
            />
          </div>

          {selectedRoom && watch('check_in_date') && watch('check_out_date') && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Room Rate:</span>
                  <span>₹{selectedRoom.rate_per_night}/night</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>
                    {Math.ceil((new Date(watch('check_out_date')).getTime() - new Date(watch('check_in_date')).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{selectedRoom.rate_per_night * Math.ceil((new Date(watch('check_out_date')).getTime() - new Date(watch('check_in_date')).getTime()) / (1000 * 60 * 60 * 24))}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{calculateGST(selectedRoom.rate_per_night * Math.ceil((new Date(watch('check_out_date')).getTime() - new Date(watch('check_in_date')).getTime()) / (1000 * 60 * 60 * 24)))}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>Total:</span>
                  <span>₹{selectedRoom.rate_per_night * Math.ceil((new Date(watch('check_out_date')).getTime() - new Date(watch('check_in_date')).getTime()) / (1000 * 60 * 60 * 24)) + calculateGST(selectedRoom.rate_per_night * Math.ceil((new Date(watch('check_out_date')).getTime() - new Date(watch('check_in_date')).getTime()) / (1000 * 60 * 60 * 24)))}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}