// import TodoList from "../components/TodoList";
// Disabling SSR on TodoList component
// https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
import dynamic from 'next/dynamic'
const TodoList = dynamic(() => import('../components/TodoList'), { ssr: false })

export default function Page() {
  return (
    <div className="flex">
      <TodoList />
    </div>
  );
}
