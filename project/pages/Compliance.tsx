'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  FileCheck,
  Plus,
  Search,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Building,
  Shield,
  FileText
} from 'lucide-react'
import { ComplianceDocument } from '@/types'
import { formatDate } from '@/lib/utils'
import { mockComplianceDocuments } from '@/lib/mockData'

export function Compliance() {
  const [documents] = useState<ComplianceDocument[]>(mockComplianceDocuments)
  const [filteredDocuments, setFilteredDocuments] = useState<ComplianceDocument[]>(mockComplianceDocuments)
  const [searchTerm, setSearchTerm] = useState('')

  const filterDocuments = () => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.document_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.document_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.issuing_authority.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredDocuments(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'default'
      case 'expired': return 'destructive'
      case 'pending_renewal': return 'secondary'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-4 w-4" />
      case 'expired': return <AlertTriangle className="h-4 w-4" />
      case 'pending_renewal': return <Calendar className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'building_plan': return <Building className="h-5 w-5" />
      case 'fire_safety': return <Shield className="h-5 w-5" />
      case 'health_license': return <FileCheck className="h-5 w-5" />
      case 'tourism_license': return <FileText className="h-5 w-5" />
      case 'gst_certificate': return <FileText className="h-5 w-5" />
      default: return <FileText className="h-5 w-5" />
    }
  }

  const validDocuments = filteredDocuments.filter(doc => doc.status === 'valid').length
  const expiredDocuments = filteredDocuments.filter(doc => doc.status === 'expired').length
  const pendingRenewal = filteredDocuments.filter(doc => doc.status === 'pending_renewal').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance</h1>
          <p className="text-gray-600">Manage certificates and regulatory documents</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid Documents</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{validDocuments}</div>
            <p className="text-xs text-muted-foreground">Up to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Renewal</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingRenewal}</div>
            <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredDocuments}</div>
            <p className="text-xs text-muted-foreground">Needs renewal</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            filterDocuments()
          }}
          className="pl-10"
        />
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getDocumentIcon(document.document_type)}
                  <CardTitle className="text-lg">{document.document_name}</CardTitle>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(document.status)}
                  <Badge variant={getStatusColor(document.status)} className="ml-2">
                    {document.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Type:</p>
                  <p className="font-medium capitalize">
                    {document.document_type.replace('_', ' ')}
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">Issuing Authority:</p>
                  <p className="font-medium">{document.issuing_authority}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Issue Date:</p>
                  <p>{formatDate(document.issue_date)}</p>
                </div>

                {document.expiry_date && (
                  <div>
                    <p className="text-muted-foreground">Expiry Date:</p>
                    <p className={
                      new Date(document.expiry_date) < new Date() 
                        ? 'text-red-600 font-medium' 
                        : new Date(document.expiry_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        ? 'text-orange-600 font-medium'
                        : ''
                    }>
                      {formatDate(document.expiry_date)}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-muted-foreground">Reminder:</p>
                  <p>{document.reminder_days} days before expiry</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No compliance documents found.</p>
        </div>
      )}
    </div>
  )
}