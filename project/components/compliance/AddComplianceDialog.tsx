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
import { ComplianceDocument } from '@/types'
import { supabase } from '@/lib/supabase'

const complianceSchema = z.object({
  document_type: z.enum(['building_plan', 'fire_safety', 'health_license', 'tourism_license', 'gst_certificate', 'other']),
  document_name: z.string().min(1, 'Document name is required'),
  document_url: z.string().url('Valid URL is required'),
  issue_date: z.string().min(1, 'Issue date is required'),
  expiry_date: z.string().optional(),
  issuing_authority: z.string().min(1, 'Issuing authority is required'),
  reminder_days: z.number().min(1, 'Reminder days must be at least 1'),
})

type ComplianceFormData = z.infer<typeof complianceSchema>

interface AddComplianceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDocumentAdded: (document: ComplianceDocument) => void
}

export function AddComplianceDialog({ 
  open, 
  onOpenChange, 
  onDocumentAdded 
}: AddComplianceDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ComplianceFormData>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      document_type: 'tourism_license',
      reminder_days: 30,
    }
  })

  const onSubmit = async (data: ComplianceFormData) => {
    setIsLoading(true)
    try {
      // Determine status based on expiry date
      let status = 'valid'
      if (data.expiry_date) {
        const expiryDate = new Date(data.expiry_date)
        const now = new Date()
        const reminderDate = new Date(expiryDate)
        reminderDate.setDate(reminderDate.getDate() - data.reminder_days)

        if (expiryDate < now) {
          status = 'expired'
        } else if (reminderDate <= now) {
          status = 'pending_renewal'
        }
      }

      const documentData = {
        ...data,
        status,
        expiry_date: data.expiry_date || null,
      }

      const { data: document, error } = await supabase
        .from('compliance_documents')
        .insert(documentData)
        .select()
        .single()

      if (error) throw error

      onDocumentAdded(document)
      onOpenChange(false)
      reset()
    } catch (error) {
      console.error('Error adding document:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Compliance Document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="document_type">Document Type</Label>
              <Select
                value={watch('document_type')}
                onValueChange={(value) => setValue('document_type', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="building_plan">Building Plan Approval</SelectItem>
                  <SelectItem value="fire_safety">Fire Safety Certificate</SelectItem>
                  <SelectItem value="health_license">Health License</SelectItem>
                  <SelectItem value="tourism_license">Tourism License</SelectItem>
                  <SelectItem value="gst_certificate">GST Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="document_name">Document Name</Label>
              <Input
                id="document_name"
                {...register('document_name')}
                placeholder="e.g., TN Tourism License 2024"
              />
              {errors.document_name && (
                <p className="text-sm text-red-500">{errors.document_name.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="document_url">Document URL</Label>
            <Input
              id="document_url"
              {...register('document_url')}
              placeholder="https://example.com/document.pdf"
            />
            {errors.document_url && (
              <p className="text-sm text-red-500">{errors.document_url.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="issuing_authority">Issuing Authority</Label>
            <Input
              id="issuing_authority"
              {...register('issuing_authority')}
              placeholder="e.g., Tamil Nadu Tourism Department"
            />
            {errors.issuing_authority && (
              <p className="text-sm text-red-500">{errors.issuing_authority.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issue_date">Issue Date</Label>
              <Input
                id="issue_date"
                type="date"
                {...register('issue_date')}
              />
              {errors.issue_date && (
                <p className="text-sm text-red-500">{errors.issue_date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="expiry_date">Expiry Date (Optional)</Label>
              <Input
                id="expiry_date"
                type="date"
                {...register('expiry_date')}
                min={watch('issue_date')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reminder_days">Reminder Days Before Expiry</Label>
            <Input
              id="reminder_days"
              type="number"
              {...register('reminder_days', { valueAsNumber: true })}
              min="1"
              max="365"
            />
            {errors.reminder_days && (
              <p className="text-sm text-red-500">{errors.reminder_days.message}</p>
            )}
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
              {isLoading ? 'Adding...' : 'Add Document'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}