import { forwardRef } from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'small',
  rounded = 'medium',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-70 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-300 dark:hover:bg-gray-700 dark:text-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
  };

  const sizeClasses = {
    small: 'text-sm py-1.5 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6'
  };

  const roundedClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <button
      ref={ref}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className={clsx(
          'animate-spin',
          iconPosition === 'left' ? 'mr-2' : 'ml-2',
          size === 'small' ? 'h-4 w-4' : 'h-5 w-5'
        )} />
      )}
      {!isLoading && icon && iconPosition === 'left' && (
        <span className={clsx('mr-2', size === 'small' ? 'h-4 w-4' : 'h-5 w-5')}>
          {icon}
        </span>
      )}
      {children}
      {!isLoading && icon && iconPosition === 'right' && (
        <span className={clsx('ml-2', size === 'small' ? 'h-4 w-4' : 'h-5 w-5')}>
          {icon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;