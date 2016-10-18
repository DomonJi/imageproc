setTimeout(function() {

  init()
})

function init() {
  var spectrum = document.getElementById('spectrum').getContext('2d')
    spectrum.fillStyle = '#ffffff'
    spectrum.fillRect(0, 0, spectrum.canvas.width, spectrum.canvas.height)
    result = document.getElementById('example').getContext('2d'),
    image = new Image()
    image.src = './images/woguo.jpg'
    var w = image.width,
      h = image.height, // w == h
      re = [],
      im = [];
    $('#ttfinput').change(function() {
      spectrum.drawImage(image, 0, 0)
      var src = spectrum.getImageData(0, 0, w, h),
        data = src.data,
        radius = $('#ttfinput').val(),
        i,
        val,
        p;
      for (var y = 0; y < h; y++) {
        i = y * w
        for (var x = 0; x < w; x++) {
          re[i + x] = data[(i << 2) + (x << 2)]
          im[i + x] = 0.0
        }
      }
      // 2D-FFT
      FFT.fft2d(re, im)
      // swap quadrant
      FrequencyFilter.swap(re, im)
      // High Pass Filter
      // FrequencyFilter.HPF(re, im, radius)
      // // Low Pass Filter
      FrequencyFilter.LPF(re, im, radius)
      // // Band Path Filter
      // FrequencyFilter.BPF(re, im, radius, radius / 2)
      // // render spectrum
      SpectrumViewer.render(re, im, true)
      // // swap quadrant
      FrequencyFilter.swap(re, im)
      // 2D-IFFT
      FFT.ifft2d(re, im)
      for (var y = 0; y < h; y++) {
        i = y * w
        for (var x = 0; x < w; x++) {
          val = re[i + x]
          p = (i << 2) + (x << 2)
          data[p] = data[p + 1] = data[p + 2] = val
        }
      }
      // put result image on the canvas
      result.putImageData(src, 0, 0)
    })
    image.addEventListener('load', function(e) {

      // initialize, radix-2 required
      FFT.init(w)
      FrequencyFilter.init(w)
      SpectrumViewer.init(spectrum)
      spectrum.drawImage(image, 0, 0)
      var src = spectrum.getImageData(0, 0, w, h),
        data = src.data,
        radius = 200,
        i,
        val,
        p;
      for (var y = 0; y < h; y++) {
        i = y * w
        for (var x = 0; x < w; x++) {
          re[i + x] = data[(i << 2) + (x << 2)]
          im[i + x] = 0.0
        }
      }
      // 2D-FFT
      FFT.fft2d(re, im)
      // swap quadrant
      FrequencyFilter.swap(re, im)
      // High Pass Filter
      // FrequencyFilter.HPF(re, im, radius)
      // // Low Pass Filter
      FrequencyFilter.LPF(re, im, radius)
      // // Band Path Filter
      // FrequencyFilter.BPF(re, im, radius, radius / 2)
      // // render spectrum
      SpectrumViewer.render(re, im, true)
      // // swap quadrant
      // FrequencyFilter.swap(re, im)
      // // 2D-IFFT
      // FFT.ifft2d(re, im)
      // for (var y = 0; y < h; y++) {
      //   i = y * w
      //   for (var x = 0; x < w; x++) {
      //     val = re[i + x]
      //     p = (i << 2) + (x << 2)
      //     data[p] = data[p + 1] = data[p + 2] = val
      //   }
      // }
      // // put result image on the canvas
      // result.putImageData(src, 0, 0)
    }, false)
  }
