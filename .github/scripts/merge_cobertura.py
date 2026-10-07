#!/usr/bin/env python3
"""Merge multiple Cobertura XML reports (one per Angular sub-project) into a
single report for upload.

Each input report is produced natively by karma-coverage's cobertura
reporter and already contains real per-line hit counts. This script performs
a faithful structural merge - namespacing each project's package/class names
and concatenating the <package> elements, then re-summing the aggregate
rate attributes - rather than reconstructing coverage data from aggregated
counters.
"""
import sys
import xml.etree.ElementTree as ET


def parse_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def main(output_path, named_inputs):
    merged_root = ET.Element("coverage")
    packages_el = ET.SubElement(merged_root, "packages")
    sources_el = ET.SubElement(merged_root, "sources")

    lines_valid = lines_covered = 0
    branches_valid = branches_covered = 0

    for name, path in named_inputs:
        tree = ET.parse(path)
        root = tree.getroot()

        lines_valid += parse_int(root.get("lines-valid"))
        lines_covered += parse_int(root.get("lines-covered"))
        branches_valid += parse_int(root.get("branches-valid"))
        branches_covered += parse_int(root.get("branches-covered"))

        ET.SubElement(sources_el, "source").text = name

        for package in root.findall("./packages/package"):
            package.set("name", name)
            for class_el in package.findall("./classes/class"):
                filename = class_el.get("filename")
                if filename:
                    class_el.set("filename", f"{name}/{filename}")
            packages_el.append(package)

    merged_root.set("lines-valid", str(lines_valid))
    merged_root.set("lines-covered", str(lines_covered))
    merged_root.set("line-rate", str(lines_covered / lines_valid) if lines_valid else "0")
    merged_root.set("branches-valid", str(branches_valid))
    merged_root.set("branches-covered", str(branches_covered))
    merged_root.set("branch-rate", str(branches_covered / branches_valid) if branches_valid else "0")
    merged_root.set("complexity", "0")
    merged_root.set("version", "0.1")

    tree = ET.ElementTree(merged_root)
    ET.indent(tree, space="  ")
    tree.write(output_path, encoding="UTF-8", xml_declaration=True)

    # Re-add the cobertura DOCTYPE, which ElementTree does not preserve.
    with open(output_path, "r+", encoding="UTF-8") as f:
        content = f.read()
        f.seek(0)
        f.truncate(0)
        f.write(content.replace(
            "<?xml version='1.0' encoding='UTF-8'?>",
            "<?xml version=\"1.0\"?>\n"
            "<!DOCTYPE coverage SYSTEM \"http://cobertura.sourceforge.net/xml/coverage-04.dtd\">",
        ))


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: merge_cobertura.py <output.xml> <name1>=<input1.xml> [<name2>=<input2.xml> ...]")
        sys.exit(1)
    pairs = [arg.split("=", 1) for arg in sys.argv[2:]]
    main(sys.argv[1], pairs)
