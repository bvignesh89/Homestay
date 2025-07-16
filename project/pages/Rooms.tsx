'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search } from 'lucide-react'
import { RoomCard } from '@/components/rooms/RoomCard'
import { AddRoomDialog } from '@/components/rooms/AddRoomDialog'
import { Room } from '@/types'
import { mockRooms } from '@/lib/mockData'

export function Rooms() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filterRooms = () => {
    let filtered = rooms

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.room_type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(room => room.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(room => room.room_type === typeFilter)
    }

    setFilteredRooms(filtered)
  }

  const handleRoomAdded = (room: Room) => {
    if (editingRoom) {
      setRooms(prev => prev.map(r => r.id === room.id ? room : r))
      setEditingRoom(null)
    } else {
      setRooms(prev => [...prev, room])
    }
    filterRooms()
  }

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room)
    setIsAddDialogOpen(true)
  }

  const handleViewRoom = (room: Room) => {
    console.log('View room:', room)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
          <p className="text-gray-600">Manage your homestay rooms</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              filterRooms()
            }}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value) => {
          setStatusFilter(value)
          filterRooms()
        }}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(value) => {
          setTypeFilter(value)
          filterRooms()
        }}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="double">Double</SelectItem>
            <SelectItem value="deluxe">Deluxe</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEdit={handleEditRoom}
            onView={handleViewRoom}
          />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No rooms found matching your criteria.</p>
          {rooms.length === 0 && (
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Room
            </Button>
          )}
        </div>
      )}

      <AddRoomDialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open)
          if (!open) setEditingRoom(null)
        }}
        onRoomAdded={handleRoomAdded}
        editingRoom={editingRoom}
      />
    </div>
  )
}