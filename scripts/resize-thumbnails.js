/**
 * Resize thumbnail images to 80% resolution (20% smaller) to reduce file size.
 * Run: node scripts/resize-thumbnails.js
 * Requires: npm install sharp --save-dev
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets')

const THUMB_PATTERNS = [
  'website-thumbs-',
  'new-customer-thumbs-',
  'website-about-thumbs-',
]

const SCALE = 0.8 // 80% = 20% smaller in each dimension

async function findThumbFiles(dir, files = []) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch (err) {
    return files
  }
  for (const ent of entries) {
    const full = join(dir, ent.name)
    if (ent.isDirectory()) {
      await findThumbFiles(full, files)
    } else if (ent.isFile() && /\.(png|jpg|jpeg|webp)$/i.test(ent.name)) {
      if (THUMB_PATTERNS.some(p => ent.name.startsWith(p))) {
        files.push(full)
      }
    }
  }
  return files
}

async function resizeWithSharp(filePath) {
  const sharp = (await import('sharp')).default
  const buf = await readFile(filePath)
  const meta = await sharp(buf).metadata()
  const w = Math.max(1, Math.round((meta.width || 0) * SCALE))
  const h = Math.max(1, Math.round((meta.height || 0) * SCALE))
  let pipeline = sharp(buf).resize(w, h, { fit: 'fill' })
  const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase()
  if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 6 })
  else if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: 85 })
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: 85 })
  const out = await pipeline.toBuffer()
  await writeFile(filePath, out)
  const rel = filePath.replace(ASSETS_DIR, '').replace(/^[/\\]/, '')
  console.log(`Resized ${rel} to ${w}×${h}`)
}

async function main() {
  try {
    await import('sharp')
  } catch {
    console.error('Run: npm install sharp --save-dev')
    process.exit(1)
  }
  const files = await findThumbFiles(ASSETS_DIR)
  if (files.length === 0) {
    console.log('No thumbnail images found matching:', THUMB_PATTERNS.join(', '))
    return
  }
  console.log(`Found ${files.length} thumbnail(s), resizing to ${SCALE * 100}%...`)
  for (const f of files) {
    await resizeWithSharp(f)
  }
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
