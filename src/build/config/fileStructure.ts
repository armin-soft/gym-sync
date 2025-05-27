
export const BUILD_DIRECTORIES = [
  'dist/Assets',
  'dist/Images', 
  'dist/Styles',
  'dist/Scripts',
  'dist/Scripts/Components',
  'dist/Fonts'
] as const;

export const SOURCE_PATHS = {
  publicImages: 'public/Assets/Image',
  manifest: 'public/Manifest.json',
  distIndex: 'dist/index.html'
} as const;

export const FILE_PATTERNS = {
  css: '.css',
  js: '.js',
  images: /\.(png|jpe?g|gif|svg|webp|ico)$/,
  fonts: /\.(woff|woff2|ttf|eot)$/
} as const;
