from pathlib import Path
import sys

import vtracer


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: trace-vtracer.py INPUT_PNG OUTPUT_SVG")

    input_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    vtracer.convert_image_to_svg_py(
        str(input_path),
        str(output_path),
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=6,
        color_precision=8,
        layer_difference=12,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        splice_threshold=45,
        path_precision=3,
    )


if __name__ == "__main__":
    main()
