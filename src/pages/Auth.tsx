'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { AuthService } from '@/services/auth.service'
import { useState, type FC } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import type { AxiosError } from 'axios'
import Field from '@/components/Field'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

type LoginFormData = z.infer<typeof LoginSchema>
type RegisterFormData = z.infer<typeof RegisterSchema>

const LoginSchema = z.object({
  login: z
    .string()
    .min(2, { message: 'Логин должен содержать минимум два символа' }),
  password: z
    .string()
    .min(4, { message: 'Пароль должен содержать минимум 4 символа' }),
})

const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, {
    message: 'Имя пользователя должно содержать минимум два символа',
  }),
})
const Auth: FC = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
    defaultValues: isLogin
      ? { login: '', password: '' }
      : { login: '', name: '', password: '' },
  })

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (isLogin) {
        await AuthService.login(data as LoginFormData)
      } else {
        await AuthService.registration(data as RegisterFormData)
        await AuthService.login({ login: data.login, password: data.password })
      }
      await AuthService.getMe()
      setIsAuthenticated(true)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      const message = err.response?.data?.message || 'Произошла ошибка запроса'
      toast.error(message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-dvh bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">
            D<span className="text-[#FF6B6B]">CC</span>
          </h2>
        </div>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className=" text-[#2C2D5B] ">
            <CardTitle className="text-xl font-medium text-center">
              {isLogin ? 'Вход' : 'Регистрация'}
            </CardTitle>
          </CardHeader>

          <CardContent className=" px-6">
            <Form {...form} key={isLogin ? 'login' : 'register'}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <Field
                  control={form.control}
                  name="login"
                  label="Логин"
                  placeholder="gena406"
                />

                {!isLogin && (
                  <Field
                    control={form.control}
                    name="name"
                    label="Имя"
                    placeholder="Генадий"
                  />
                )}

                <Field
                  control={form.control}
                  name="password"
                  label="Пароль"
                  type="password"
                  placeholder="••••••••"
                />

                <Button
                  className="w-full bg-[#2C2D5B] hover:bg-[#1e2139] text-white py-5 mt-4"
                  type="submit"
                >
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center pb-6 pt-2 px-6">
            <p className="text-center text-sm text-gray-600">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#FF6B6B] font-medium hover:underline"
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default Auth
