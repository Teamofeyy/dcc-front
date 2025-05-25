import type { FC } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import type { Control } from 'react-hook-form'

type FieldProps = {
  control: Control<any>
  name: 'login' | 'password' | 'name'
  label: string
  type?: string
  placeholder?: string
}

const Field: FC<FieldProps> = ({
  control,
  name,
  label,
  type = 'text',
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-gray-700">{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className="border-gray-200 focus-visible:ring-[#FF6B6B] focus-visible:ring-opacity-50"
          />
        </FormControl>
        <FormMessage className="text-[#FF6B6B]" />
      </FormItem>
    )}
  />
)

export default Field
