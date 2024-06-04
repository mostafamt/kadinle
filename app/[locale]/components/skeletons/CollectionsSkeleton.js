import React from 'react'

export const CollectionsSkeleton = () => {
  return (
    <div className="">
    <div className="grid grid-cols-3 gap-4">
      <div className="animate-pulse h-[150px] bg-gray-100 rounded-md" />
      <div className="animate-pulse h-[150px] bg-gray-100 rounded-md" />
      <div className="animate-pulse h-[150px] bg-gray-100 rounded-md" />
    </div>
  </div>
)
}
