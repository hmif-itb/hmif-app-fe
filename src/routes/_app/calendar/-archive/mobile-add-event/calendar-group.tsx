// import {
//   FormField,
//   FormControl,
//   FormItem,
//   FormMessage,
// } from '~/components/ui/form';
// import { ComponentProps } from './-constants';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '~/components/ui/select';
// import { api } from '~/api/client';
// import { useQuery } from '@tanstack/react-query';

// export default function CalendarGroup({ form }: ComponentProps): JSX.Element {
//   const { data } = useQuery({
//     queryKey: [],
//     queryFn: () => api.calendar.getCalendarGroup(),
//   });

//   return (
//     <div>
//       <FormField
//         control={form.control}
//         name="calendarGroupId"
//         render={({ field }) => (
//           <FormItem>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//               <FormControl>
//                 <SelectTrigger>
//                   <div className="flex items-baseline">
//                     <SelectValue placeholder="Select a group" />
//                     <FormMessage className="ml-4" />
//                   </div>
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {data?.map((group) => (
//                   <SelectItem key={group.id} value={`${group.id}`}>
//                     {group.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// }
