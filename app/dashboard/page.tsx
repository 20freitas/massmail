import { SendForm } from '@/components/SendForm';
import { ProgressLog } from '@/components/ProgressLog';

export default function Page() {
  return (
      <div className="grid gap-4 lg:grid-cols-2 items-start h-full">
        <div className="h-full overflow-y-auto">
          <SendForm />
        </div>
        <div className="h-full flex flex-col">
          <ProgressLog />
        </div>
      </div>
  );
}
