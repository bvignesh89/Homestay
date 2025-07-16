'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bed, 
  Users, 
  IndianRupee, 
  Calendar,
  TrendingUp,
  Star,
  AlertTriangle
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockRooms, mockBookings } from '@/lib/mockData'

export function Dashboard() {
  const totalRooms = mockRooms.length
  const occupiedRooms = mockRooms.filter(r => r.status === 'occupied').length
  const availableRooms = mockRooms.filter(r => r.status === 'available').length
  const maintenanceRooms = mockRooms.filter(r => r.status === 'maintenance').length
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100)

  const todayRevenue = 15000
  const monthlyRevenue = 450000
  const totalBookings = mockBookings.length
  const averageRating = 4.5

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your homestay.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room Occupancy</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {occupiedRooms} of {totalRooms} rooms occupied
            </p>
            <Badge 
              variant={occupancyRate > 80 ? "default" : occupancyRate > 60 ? "secondary" : "outline"}
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
            <div className="text-2xl font-bold">{formatCurrency(todayRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guest Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}/5</div>
            <p className="text-xs text-muted-foreground">Average satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Room Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Room Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Available Rooms</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {availableRooms} rooms
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Occupied Rooms</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {occupiedRooms} rooms
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Under Maintenance</span>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  {maintenanceRooms} rooms
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New booking confirmed</p>
                  <p className="text-xs text-muted-foreground">Room 102 - Rajesh Kumar</p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-muted-foreground">₹10,620 via UPI</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Maintenance completed</p>
                  <p className="text-xs text-muted-foreground">Room 201 cleaning</p>
                </div>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Calendar className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">New Booking</h3>
              <p className="text-sm text-muted-foreground">Create reservation</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium">Add Guest</h3>
              <p className="text-sm text-muted-foreground">Register new guest</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Bed className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium">Room Status</h3>
              <p className="text-sm text-muted-foreground">Update availability</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <IndianRupee className="h-8 w-8 text-orange-600 mb-2" />
              <h3 className="font-medium">Record Payment</h3>
              <p className="text-sm text-muted-foreground">Process transaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}