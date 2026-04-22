"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
                    style={{ background: "oklch(0.50 0.17 162)" }}
                />
                <div
                    className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-15"
                    style={{ background: "oklch(0.82 0.13 85)" }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center">
                    {/* Logo/Icon */}
                    <div className="mb-8 p-3 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                            background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                        }}
                    >
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Selamat Datang</h1>
                        <p className="text-sm text-muted-foreground">
                            Masuk ke dashboard panel admin/guru
                        </p>
                    </div>

                    <form action={action} className="w-full space-y-5">
                        {state?.error && (
                            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
                                <AlertDescription>{state.error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="identifier">Username atau Email</Label>
                            <Input
                                id="identifier"
                                name="identifier"
                                placeholder="Masukkan username/email"
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="#"
                                    className="text-xs text-primary hover:underline font-medium"
                                >
                                    Lupa Password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="h-11"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 font-bold text-md mt-2 flex items-center gap-2"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Masuk <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        <p>Hanya untuk admin & staf.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}