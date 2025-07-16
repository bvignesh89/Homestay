'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Staff } from '@/types'
import { supabase } from '@/lib/supabase'

const staffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['admin', 'manager', 'housekeeping', 'maintenance', 'reception']),
  department: z.string().min(1, 'Department is required'),
  hire_date: z.string().min(1, 'Hire date is required'),
  salary: z.number().optional(),
})

type StaffFormData = z.infer<typeof staffSchema>

interface AddStaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStaffAdded: (staff: Staff) => void
  editingStaff?: Staff | null
}

const availablePermissions = [
  'manage_rooms',
  'manage_bookings',
  'manage_guests',
  'manage_payments',
  'manage_maintenance',
  'view_analytics',
  'manage_staff',
  'manage_compliance',
]

export function AddStaffDialog({ 
  open, 
  onOpenChange, 
  onStaffAdded, 
  editingStaff 
}: AddStaffDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    editingStaff?.permissions || []
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: editingStaff ? {
      name: editingStaff.name,
      email: editingStaff.email,
      phone: editingStaff.phone,
      role: editingStaff.role,
      department: editingStaff.department,
      hire_date: editingStaff.hire_date.split('T')[0],
      salary: editingStaff.salary || undefined,
    } : {
      role: 'reception',
      hire_date: new Date().toISOString().split('T')[0],
    }
  })

  const onSubmit = async (data: StaffFormData) => {
    setIsLoading(true)
    try {
      const staffData = {
        ...data,
        status: editingStaff?.status || 'active',
        permissions: selectedPermissions,
        salary: data.salary || null,
      }

      let result
      if (editingStaff) {
        result = await supabase
          .from('staff')
          .update(staffData)
          .eq('id', editingStaff.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('staff')
          .insert(staffData)
          .select()
          .single()
      }

      if (result.error) throw result.error

      onStaffAdded(result.data)
      onOpenChange(false)
      reset()
      setSelectedPermissions([])
    } catch (error) {
      console.error('Error saving staff:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permission])
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permission))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+91 9876543210"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="hire_date">Hire Date</Label>
                <Input
                  id="hire_date"
                  type="date"
                  {...register('hire_date')}
                />
                {errors.hire_date && (
                  <p className="text-sm text-red-500">{errors.hire_date.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Job Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={watch('role')}
                  onValueChange={(value) => setValue('role', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  {...register('department')}
                  placeholder="Front Office"
                />
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input
                  id="salary"
                  type="number"
                  {...register('salary', { valueAsNumber: true })}
                  placeholder="25000"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-medium mb-3">Permissions</h3>
            <div className="grid grid-cols-2 gap-3">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={selectedPermissions.includes(permission)}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(permission, checked as boolean)
                    }
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : editingStaff ? 'Update Staff' : 'Add Staff'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}