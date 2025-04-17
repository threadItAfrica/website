"use client";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const searchSchema = yup.object({
  searchQuery: yup.string().required('Please enter a search term').min(2, 'Search term must be at least 2 characters'),
})

type SearchFormInputs = yup.InferType<typeof searchSchema>

export const SearchBar = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      searchQuery: ''
    }
  })

  const onSubmit = ({ searchQuery }: SearchFormInputs) => {
    if (searchQuery.trim()) {
      router.push(`/searchPost/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="w-full max-w-[250px] lg:max-w-[400px] mt-6 ">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex items-center justify-center border bg-white border-gray-300 rounded-lg p-2 w-full">
        <input
          {...register('searchQuery')}
          type="text"
          placeholder="Search for articles, tips, and more..."
          className="w-full h-full outline-none"
        />
        <button type="submit" className="bg-primary text-white rounded-lg p-2 ml-2 hover:text-gray-700">
          <FaRegArrowAltCircleRight  />
        </button>
      </form>
      {errors.searchQuery && (
        <p className="text-red-500 text-sm mt-1">{errors.searchQuery.message}</p>
      )}
    </div>
  )
}
