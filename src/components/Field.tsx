import type { InputHTMLAttributes } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'

type FieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  registerOptions?: RegisterOptions<T, FieldPath<T>>
} & InputHTMLAttributes<HTMLInputElement>

const Field = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  registerOptions,
  ...inputProps
}: FieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    rules={registerOptions}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-gray-700">{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            {...inputProps}
            type={type}
            className="border-gray-200 focus-visible:ring-[#FF6B6B] focus-visible:ring-opacity-50"
          />
        </FormControl>
        <FormMessage className="text-[#FF6B6B]" />
      </FormItem>
    )}
  />
)

export default Field
