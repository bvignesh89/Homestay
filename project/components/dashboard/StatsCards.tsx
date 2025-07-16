import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bed, 
  Users, 
  IndianRupee, 
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useLanguage } from '@/hooks/useLanguage'
import { useTranslation } from '@/lib/translations'

interface StatsCardsProps {
  stats: {
    totalRooms: number
    occupiedRooms: number
    todayRevenue: number
    monthlyRevenue: number
    totalBookings: number
    averageRating: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const occupancyRate = Math.round((stats.occupiedRooms / stats.totalRooms) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Room Occupancy</CardTitle>
          <Bed className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancyRate}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.occupiedRooms} of {stats.totalRooms} rooms occupied
          </p>
          <Badge 
            variant={occupancyRate > 80 ? "success" : occupancyRate > 60 ? "warning" : "secondary"}
            className="mt-2"
          >
            {occupancyRate > 80 ? "High" : occupancyRate > 60 ? "Medium" : "Low"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            +12% from yesterday
          </p>
          <Badge variant="success" className="mt-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending up
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            +8% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">
            This month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Guest Satisfaction</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}/5</div>
          <p className="text-xs text-muted-foreground">
            Average rating
          </p>
          <Badge variant="success" className="mt-2">
            Excellent
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.occupiedRooms * 2}</div>
          <p className="text-xs text-muted-foreground">
            Currently checked in
          </p>
        </CardContent>
      </Card>
    </div>
  )
}