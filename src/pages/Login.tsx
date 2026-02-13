import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Phone, User, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Login() {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultTab = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    // Signup State
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [signupError, setSignupError] = useState('');
    const [isSignupLoading, setIsSignupLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    // Modify default redirect to be smarter later if needed, but for now "/" is safe for general users
    // Admin logic might need a check
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        setActiveTab(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
    }, [searchParams]);

    const onTabChange = (value: string) => {
        setActiveTab(value);
        setSearchParams(prev => {
            prev.set('mode', value);
            return prev;
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoginLoading(true);

        try {
            await login({ email: loginEmail, password: loginPassword });
            // If successful, navigate. 
            // TODO: Check if user is admin and redirect to dashboard? 
            // For now, let's assume the user knows where they are going or default to home/dashboard based on role if possible.
            // But we don't have role easily accessible here without decoding or modifying login return.
            // Let's stick to existing logic: if they came from a protected route, 'redirect' handles it.
            // If they came from "Login" button, redirect is '/'. 
            // If they are admin, they might want dashboard. 
            // I'll leave it as `navigate(redirect)` but maybe default to `/admin/dashboard` if email suggests admin? No, that's flaky.
            navigate(redirect === '/' ? '/admin/dashboard' : redirect);
        } catch (err) {
            setLoginError('Invalid credentials. Please try again.');
        } finally {
            setIsLoginLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupError('');

        if (signupData.password !== signupData.confirmPassword) {
            setSignupError('Passwords do not match');
            return;
        }

        setIsSignupLoading(true);

        try {
            const response = await authApi.signup({
                name: signupData.name,
                email: signupData.email,
                phone: signupData.phone,
                password: signupData.password,
                role: 'customer',
            });

            if (response.success && response.data) {
                localStorage.setItem('auth_token', response.data.token);
                toast.success('Account created successfully!');
                // Force a page reload or update auth context if needed, but navigate usually suffices if App checks token on mount
                // However, useAuth might need to be notified. 
                // Ideally login() should be used.
                // Let's manually reload or call a "refresh" if available.
                // Or just navigate and let the app handle token presence.
                window.location.href = redirect;
            } else {
                setSignupError(response.error || 'Failed to create account');
            }
        } catch (err) {
            setSignupError('An error occurred. Please try again.');
        } finally {
            setIsSignupLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-secondary/30 p-4 pt-24 pb-12">
                <Card className="w-full max-w-md shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 min-h-[600px] transition-all duration-300">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-heading font-light text-center tracking-wide">
                            Welcome to TalkItOut
                        </CardTitle>
                        <CardDescription className="text-center font-body text-muted-foreground">
                            Sign in or create an account to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="login">Sign In</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    {loginError && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{loginError}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="login-email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="login-email"
                                                type="email"
                                                placeholder="Enter your email"
                                                className="pl-10"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                required
                                                disabled={isLoginLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="login-password"
                                                type="password"
                                                placeholder="Enter your password"
                                                className="pl-10"
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                                required
                                                disabled={isLoginLoading}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full btn-elegant" disabled={isLoginLoading}>
                                        {isLoginLoading ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup">
                                <form onSubmit={handleSignup} className="space-y-4">
                                    {signupError && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{signupError}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-name"
                                                placeholder="John Doe"
                                                className="pl-10"
                                                value={signupData.name}
                                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                required
                                                disabled={isSignupLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="pl-10"
                                                value={signupData.email}
                                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                                required
                                                disabled={isSignupLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-phone"
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                className="pl-10"
                                                value={signupData.phone}
                                                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                                                required
                                                disabled={isSignupLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-password"
                                                type="password"
                                                placeholder="Create a password"
                                                className="pl-10"
                                                value={signupData.password}
                                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                required
                                                minLength={6}
                                                disabled={isSignupLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-confirm"
                                                type="password"
                                                placeholder="Confirm your password"
                                                className="pl-10"
                                                value={signupData.confirmPassword}
                                                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                                required
                                                disabled={isSignupLoading}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full btn-elegant" disabled={isSignupLoading}>
                                        {isSignupLoading ? 'Creating account...' : 'Create Account'}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
