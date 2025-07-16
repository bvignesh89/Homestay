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
import { MaintenanceLog, Room } from '@/types'
import { supabase } from '@/lib/supabase'

const maintenanceSchema = z.object({
  room_id: z.string().min(1, 'Room is required'),
  type: z.enum(['cleaning', 'repair', 'inspection', 'maintenance']),
  description: z.string().min(1, 'Description is required'),
  assigned_to: z.string().min(1, 'Assigned person is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  scheduled_date: z.string().min(1, 'Scheduled date is required'),
  cost: z.number().optional(),
  notes: z.string().optional(),
})

type MaintenanceFormData = z.infer<typeof maintenanceSchema>

interface AddMaintenanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogAdded: (log: MaintenanceLog) => void
  editingLog?: MaintenanceLog | null
}

export function AddMaintenanceDialog({ 
  open, 
  onOpenChange, 
  onLogAdded, 
  editingLog 
}: AddMaintenanceDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: editingLog ? {
      room_id: editingLog.room_id,
      type: editingLog.type,
      description: editingLog.description,
      assigned_to: editingLog.assigned_to,
      priority: editingLog.priority,
      scheduled_date: editingLog.scheduled_date.split('T')[0],
      cost: editingLog.cost || undefined,
      notes: editingLog.notes || '',
    } : {
      type: 'cleaning',
      priority: 'medium',
      scheduled_date: new Date().toISOString().split('T')[0],
    }
  })

  useEffect(() => {
    if (open) {
      loadRooms()
    }
  }, [open])

  const loadRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('room_number')

      if (error) throw error
      setRooms(data || [])
    } catch (error) {
      console.error('Error loading rooms:', error)
    }
  }

  const onSubmit = async (data: MaintenanceFormData) => {
    setIsLoading(true)
    try {
      const logData = {
        room_id: data.room_id,
        type: data.type,
        description: data.description,
        assigned_to: data.assigned_to,
        priority: data.priority,
        scheduled_date: data.scheduled_date,
        status: editingLog?.status || 'pending',
        cost: data.cost || null,
        notes: data.notes || null,
      }

      let result
      if (editingLog) {
        result = await supabase
          .from('maintenance_logs')
          .update(logData)
          .eq('id', editingLog.id)
          .select(`
            *,
            room:rooms(room_number, room_type)
          `)
          .single()
      } else {
        result = await supabase
          .from('maintenance_logs')
          .insert(logData)
          .select(`
            *,
            room:rooms(room_number, room_type)
          `)
          .single()
      }

      if (result.error) throw result.error

      onLogAdded(result.data)
      onOpenChange(false)
      reset()
    } catch (error) {
      console.error('Error saving maintenance log:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingLog ? 'Edit Maintenance Task' : 'Add Maintenance Task'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="room_id">Room</Label>
              <Select
                value={watch('room_id')}
                onValueChange={(value) => setValue('room_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.room_number} - {room.room_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.room_id && (
                <p className="text-sm text-red-500">{errors.room_id.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={watch('type')}
                onValueChange={(value) => setValue('type', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe the maintenance task..."
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                {...register('assigned_to')}
                placeholder="Staff member name"
              />
              {errors.assigned_to && (
                <p className="text-sm text-red-500">{errors.assigned_to.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={watch('priority')}
                onValueChange={(value) => setValue('priority', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduled_date">Scheduled Date</Label>
              <Input
                id="scheduled_date"
                type="date"
                {...register('scheduled_date')}
              />
              {errors.scheduled_date && (
                <p className="text-sm text-red-500">{errors.scheduled_date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cost">Cost (₹)</Label>
              <Input
                id="cost"
                type="number"
                {...register('cost', { valueAsNumber: true })}
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Additional notes..."
              rows={2}
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
              {isLoading ? 'Saving...' : editingLog ? 'Update Task' : 'Add Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}