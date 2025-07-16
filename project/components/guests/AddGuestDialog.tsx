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
import { Guest } from '@/types'
import { supabase } from '@/lib/supabase'

const guestSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  id_type: z.enum(['aadhar', 'passport', 'driving_license', 'voter_id']),
  id_number: z.string().min(1, 'ID number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
})

type GuestFormData = z.infer<typeof guestSchema>

interface AddGuestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGuestAdded: (guest: Guest) => void
  editingGuest?: Guest | null
}

export function AddGuestDialog({ 
  open, 
  onOpenChange, 
  onGuestAdded, 
  editingGuest 
}: AddGuestDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: editingGuest ? {
      first_name: editingGuest.first_name,
      last_name: editingGuest.last_name,
      email: editingGuest.email,
      phone: editingGuest.phone,
      id_type: editingGuest.id_type,
      id_number: editingGuest.id_number,
      address: editingGuest.address,
      city: editingGuest.city,
      state: editingGuest.state,
      country: editingGuest.country,
      date_of_birth: editingGuest.date_of_birth,
      nationality: editingGuest.nationality,
      emergency_contact_name: editingGuest.emergency_contact_name || '',
      emergency_contact_phone: editingGuest.emergency_contact_phone || '',
    } : {
      id_type: 'aadhar',
      country: 'India',
      nationality: 'Indian',
    }
  })

  const onSubmit = async (data: GuestFormData) => {
    setIsLoading(true)
    try {
      let result
      if (editingGuest) {
        result = await supabase
          .from('guests')
          .update(data)
          .eq('id', editingGuest.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('guests')
          .insert(data)
          .select()
          .single()
      }

      if (result.error) throw result.error

      onGuestAdded(result.data)
      onOpenChange(false)
      reset()
    } catch (error) {
      console.error('Error saving guest:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingGuest ? 'Edit Guest' : 'Add New Guest'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  {...register('first_name')}
                  placeholder="John"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  {...register('last_name')}
                  placeholder="Doe"
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">{errors.last_name.message}</p>
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
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  {...register('date_of_birth')}
                />
                {errors.date_of_birth && (
                  <p className="text-sm text-red-500">{errors.date_of_birth.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  {...register('nationality')}
                  placeholder="Indian"
                />
                {errors.nationality && (
                  <p className="text-sm text-red-500">{errors.nationality.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* ID Verification */}
          <div>
            <h3 className="text-lg font-medium mb-3">ID Verification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id_type">ID Type</Label>
                <Select
                  value={watch('id_type')}
                  onValueChange={(value) => setValue('id_type', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driving_license">Driving License</SelectItem>
                    <SelectItem value="voter_id">Voter ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="id_number">ID Number</Label>
                <Input
                  id="id_number"
                  {...register('id_number')}
                  placeholder="1234 5678 9012"
                />
                {errors.id_number && (
                  <p className="text-sm text-red-500">{errors.id_number.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-medium mb-3">Address</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="Chennai"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register('state')}
                    placeholder="Tamil Nadu"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register('country')}
                    placeholder="India"
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">{errors.country.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-medium mb-3">Emergency Contact (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency_contact_name">Contact Name</Label>
                <Input
                  id="emergency_contact_name"
                  {...register('emergency_contact_name')}
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                <Input
                  id="emergency_contact_phone"
                  {...register('emergency_contact_phone')}
                  placeholder="+91 9876543210"
                />
              </div>
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
              {isLoading ? 'Saving...' : editingGuest ? 'Update Guest' : 'Add Guest'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}