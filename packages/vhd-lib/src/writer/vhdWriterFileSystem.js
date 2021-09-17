import VHDWriter from './writer'

class VHDWriterFileSystem extends VHDWriter {
  constructor(vhd, { path }) {
    super(vhd)
  }
  _writeBlock(streamOrBuffer, offset) {}

  write() {
    // shouldn't have concurrency problem since we know each block start and end
    Promise
      .concurrencyLimited
      // write footer
      // write header
      // write BAT
      // write block
      // write footer
      ()
  }
}
