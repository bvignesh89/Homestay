'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  FileText,
  Calendar
} from 'lucide-react'
import { Guest } from '@/types'
import { formatDate } from '@/lib/utils'
import { mockGuests } from '@/lib/mockData'

export function Guests() {
  const [guests] = useState<Guest[]>(mockGuests)
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>(mockGuests)
  const [searchTerm, setSearchTerm] = useState('')

  const filterGuests = () => {
    let filtered = guests

    if (searchTerm) {
      filtered = filtered.filter(guest =>
        guest.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone.includes(searchTerm)
      )
    }

    setFilteredGuests(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guests</h1>
          <p className="text-gray-600">Manage guest information and KYC details</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search guests..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            filterGuests()
          }}
          className="pl-10"
        />
      </div>

      {/* Guests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.map((guest) => (
          <Card key={guest.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {guest.first_name} {guest.last_name}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {guest.nationality}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{guest.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{guest.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{guest.city}, {guest.state}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-xs">{guest.id_type}: {guest.id_number}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-xs">Joined {formatDate(guest.created_at)}</span>
                </div>
              </div>

              {guest.emergency_contact_name && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Emergency Contact:</p>
                  <p className="text-sm font-medium">{guest.emergency_contact_name}</p>
                  <p className="text-xs">{guest.emergency_contact_phone}</p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No guests found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}