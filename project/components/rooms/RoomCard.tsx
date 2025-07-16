import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Bed, 
  Users, 
  Wifi, 
  Car, 
  Coffee, 
  Tv,
  Edit,
  Eye
} from 'lucide-react'
import { Room } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface RoomCardProps {
  room: Room
  onEdit: (room: Room) => void
  onView: (room: Room) => void
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  tv: Tv,
}

const statusColors = {
  available: 'default',
  occupied: 'secondary',
  maintenance: 'destructive',
} as const

export function RoomCard({ room, onEdit, onView }: RoomCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Room {room.room_number}</CardTitle>
          <Badge variant={statusColors[room.status]}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Bed className="h-4 w-4" />
          <span className="capitalize">{room.room_type}</span>
          <Users className="h-4 w-4 ml-2" />
          <span>Max {room.max_occupancy}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-green-600">
          {formatCurrency(room.rate_per_night)}
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </div>

        {room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((amenity) => {
              const Icon = amenityIcons[amenity.toLowerCase()] || Coffee
              return (
                <div key={amenity} className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon className="h-3 w-3" />
                  <span>{amenity}</span>
                </div>
              )
            })}
            {room.amenities.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>
        )}

        {room.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {room.description}
          </p>
        )}

        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onView(room)}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(room)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}