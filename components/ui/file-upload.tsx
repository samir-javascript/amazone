"use client"

import React, { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  preview?: string
  onRemove?: () => void
  className?: string
  accept?: string
  multiple?: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  preview,
  onRemove,
  className,
  accept = "image/*",
  multiple = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && files[0]) {
      onFileSelect(files[0])
    }
  }, [onFileSelect])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div className={cn("relative group", className)}>
      {preview ? (
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full h-32 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer",
            "flex flex-col items-center justify-center space-y-2",
            "hover:border-blue-400 hover:bg-blue-50/50",
            isDragOver ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-300 bg-gray-50/50"
          )}
        >
          <ImageIcon className={cn(
            "w-8 h-8 transition-colors duration-300",
            isDragOver ? "text-blue-500" : "text-gray-400"
          )} />
          <div className="text-center">
            <p className={cn(
              "text-sm font-medium transition-colors duration-300",
              isDragOver ? "text-blue-600" : "text-gray-600"
            )}>
              Drop image here or click to upload
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}
      
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  )
}