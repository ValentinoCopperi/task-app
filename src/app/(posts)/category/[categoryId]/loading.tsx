import PostSkeleton from "@/components/posts/skeleton/PostSkeleton";

export default function Loading() {
    return (
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8 w-full ">
          <PostSkeleton/>
        </div>
    );
  }
  