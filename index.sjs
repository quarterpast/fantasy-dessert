operator (>>=) 14 left {$l, $r} => #{$l.chain($r)}
operator (>=>) 14 left {$l, $r} => #{λ[$l(#) >>= $r]}
operator (=>>) 14 left {$l, $r} => #{λ[$l(#) >> $r]}
operator (>>)  14 left {$l, $r} => #{$l >>= λ[$r]}

macro do {
	rule {
		{
			$a:ident <- $m:expr;
			$rest ...
		} 
	} => {
		($m >>= λ $a -> do {
			$rest ...
		})
	}

	rule {
		{
			<- $m:expr;
			$rest ...
		}
	} => {
		($m >> do {
			$rest ...
		})
	}

	rule {
		{
			var $($a:ident = $b:expr) (,) ...;
			$rest ...
		}
	} => {
		(function($a ...) {
			return do {
				$rest ...
			}
		}.call(this, $b (,) ...))
	}

	rule {
		{ return $a:expr; }
	} => {
		this.constructor.of($a)
	}

	rule {
		{ $a:expr }
	} => {
		$a
	}

	rule {
		{ $a:expr ; }
	} => {
		$a
	}

	rule {{}} => {}
	rule {} => {}
}

export do;
export (>>=);
export (>=>);
export (=>>);
export (>>);