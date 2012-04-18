var base = require('./src/base'),
    BenchmarkSuite = base.BenchmarkSuite,
    Benchmark = base.Benchmark;

require('./src/richards').init(BenchmarkSuite, Benchmark);
require('./src/deltablue').init(BenchmarkSuite, Benchmark);
require('./src/crypto').init(BenchmarkSuite, Benchmark);
require('./src/raytrace').init(BenchmarkSuite, Benchmark);
require('./src/earley-boyer').init(BenchmarkSuite, Benchmark);
require('./src/regexp').init(BenchmarkSuite, Benchmark);
require('./src/splay').init(BenchmarkSuite, Benchmark);
require('./src/navier-stokes').init(BenchmarkSuite, Benchmark);

var completed = 0;
var benchmarks = BenchmarkSuite.CountBenchmarks();
var success = true;

function ShowProgress(name) {
  var percentage = ((++completed) / benchmarks) * 100;
  console.log('Running: %d% completed', Math.round(percentage));
}

function AddResult(name, result) {
  console.log('%s: %s', name, result);
}

function AddError(name, error) {
  console.log(name, error);
  success = false;
}

function AddScore(score) {
  if (success) {
    console.log('Score: %d', score);
  }
}

function Run() {
  BenchmarkSuite.RunSuites({
    NotifyStep: ShowProgress,
    NotifyError: AddError,
    NotifyResult: AddResult,
    NotifyScore: AddScore
  });
}

// main
console.log('V8 Benchmark Suite - version %d', BenchmarkSuite.version);
setTimeout(Run, 200);
