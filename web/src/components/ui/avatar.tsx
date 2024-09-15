import * as AvatarPrimitive from '@radix-ui/react-avatar';

export function Avatar() {
  return (
    <AvatarPrimitive.Root className="inline-flex size-16 select-none items-center justify-center overflow-hidden rounded-full align-middle bg-gradient-to-r from-pink-500 to-violet-500 p-[4px]">
      <AvatarPrimitive.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src="https://avatars.githubusercontent.com/u/52107154?v=4"
        alt="user github"
      />
    </AvatarPrimitive.Root>
  );
}
