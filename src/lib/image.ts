export async function preloadImages(images: string[]) {
  await Promise.all(
    images.map((image) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.src = image;
      });
    }),
  );
}
