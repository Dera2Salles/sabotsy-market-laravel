<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureProducerIsApproved
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // If user is a producer and not approved, redirect to pending approval page
        if ($user && $user->isProducer() && !$user->is_approved) {
            // Allow access to the pending-approval page itself and logout
            if ($request->routeIs('producer.pending-approval') || $request->routeIs('logout')) {
                return $next($request);
            }

            return redirect()->route('producer.pending-approval');
        }

        return $next($request);
    }
}
