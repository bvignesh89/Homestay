import { useState } from 'react'
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
import { Room } from '@/types'

const roomSchema = z.object({
  room_number: z.string().min(1, 'Room number is required'),
  room_type: z.enum(['single', 'double', 'deluxe', 'suite']),
  rate_per_night: z.number().min(1, 'Rate must be greater than 0'),
  max_occupancy: z.number().min(1, 'Max occupancy must be at least 1'),
  description: z.string().optional(),
  amenities: z.string(),
})

type RoomFormData = z.infer<typeof roomSchema>

interface AddRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRoomAdded: (room: Room) => void
  editingRoom?: Room | null
}

export function AddRoomDialog({ 
  open, 
  onOpenChange, 
  onRoomAdded, 
  editingRoom 
}: AddRoomDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: editingRoom ? {
      room_number: editingRoom.room_number,
      room_type: editingRoom.room_type,
      rate_per_night: editingRoom.rate_per_night,
      max_occupancy: editingRoom.max_occupancy,
      description: editingRoom.description || '',
      amenities: editingRoom.amenities.join(', '),
    } : {
      room_type: 'single',
      max_occupancy: 2,
      amenities: '',
    }
  })

  const onSubmit = async (data: RoomFormData) => {
    setIsLoading(true)
    try {
      const amenitiesArray = data.amenities
        .split(',')
        .map(a => a.trim())
        .filter(a => a.length > 0)

      const roomData: Room = {
        id: editingRoom?.id || Math.random().toString(36).substr(2, 9),
        room_number: data.room_number,
        room_type: data.room_type,
        rate_per_night: data.rate_per_night,
        max_occupancy: data.max_occupancy,
        description: data.description,
        amenities: amenitiesArray,
        status: editingRoom?.status || 'available',
        created_at: editingRoom?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      onRoomAdded(roomData)
      onOpenChange(false)
      reset()
    } catch (error) {
      console.error('Error saving room:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingRoom ? 'Edit Room' : 'Add New Room'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="room_number">Room Number</Label>
            <Input
              id="room_number"
              {...register('room_number')}
              placeholder="e.g., 101, 201"
            />
            {errors.room_number && (
              <p className="text-sm text-red-500">{errors.room_number.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="room_type">Room Type</Label>
            <Select
              value={watch('room_type')}
              onValueChange={(value) => setValue('room_type', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="rate_per_night">Rate per Night (₹)</Label>
            <Input
              id="rate_per_night"
              type="number"
              {...register('rate_per_night', { valueAsNumber: true })}
              placeholder="2000"
            />
            {errors.rate_per_night && (
              <p className="text-sm text-red-500">{errors.rate_per_night.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="max_occupancy">Max Occupancy</Label>
            <Input
              id="max_occupancy"
              type="number"
              {...register('max_occupancy', { valueAsNumber: true })}
              placeholder="2"
            />
            {errors.max_occupancy && (
              <p className="text-sm text-red-500">{errors.max_occupancy.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input
              id="amenities"
              {...register('amenities')}
              placeholder="WiFi, TV, AC, Breakfast"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Room description..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : editingRoom ? 'Update' : 'Add Room'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}