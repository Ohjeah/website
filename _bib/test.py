import tempfile

import delegator
import pytest

bibfile = "references.bib"

def _test(fn):
    pybtex = "pybtex-format {} {}".format(fn, fn.split(".")[0]+".txt")
    grep = "grep ERROR"
    cmd = delegator.run(pybtex)
    err = cmd.err
    print(err)
    err = err.count("ERROR")
    return err

cases = [
    (bibfile, 0),
    ("test/fail.bib", 1),
    ("test/nofail.bib", 0)
]


@pytest.mark.parametrize("case", cases)
def test_test_bibfile(case):
    fn, res = case
    assert _test(fn) == res
