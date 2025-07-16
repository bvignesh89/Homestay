'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Plus, Search, Eye, Users, IndianRupee } from 'lucide-react'
import { Booking } from '@/types'
import { formatDate, formatCurrency } from '@/lib/utils'
import { mockBookings, mockGuests, mockRooms } from '@/lib/mockData'

export function Bookings() {
  const [bookings] = useState<Booking[]>(mockBookings.map(booking => ({
    ...booking,
    guest: mockGuests.find(g => g.id === booking.guest_id),
    room: mockRooms.find(r => r.id === booking.room_id)
  })))
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filterBookings = () => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guest?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guest?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.room?.room_number?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }

    setFilteredBookings(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default'
      case 'checked_in': return 'secondary'
      case 'checked_out': return 'outline'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">Manage guest reservations and check-ins</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              filterBookings()
            }}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value) => {
          setStatusFilter(value)
          filterBookings()
        }}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="checked_in">Checked In</SelectItem>
            <SelectItem value="checked_out">Checked Out</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-semibold text-lg">{booking.booking_id}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.guest?.first_name} {booking.guest?.last_name}
                    </p>
                    <div className="flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      <span className="text-xs">{booking.number_of_guests} guests</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Room {booking.room?.room_number}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {booking.room?.room_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {formatDate(booking.check_in_date)}
                    </p>
                    <p className="text-xs text-muted-foreground">Check-in</p>
                    <p className="text-sm font-medium mt-1">
                      {formatDate(booking.check_out_date)}
                    </p>
                    <p className="text-xs text-muted-foreground">Check-out</p>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{formatCurrency(booking.final_amount)}</span>
                    </div>
                    <Badge variant={getStatusColor(booking.status)} className="mt-1">
                      {booking.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No bookings found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}