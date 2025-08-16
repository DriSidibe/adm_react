import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
    </div>
  );
}