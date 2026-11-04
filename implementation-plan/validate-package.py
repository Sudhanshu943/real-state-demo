"""Validate this specification package, not the future website. Standard library only."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
errors = []
checks = []

def check(condition, description):
    checks.append({"check": description, "passed": bool(condition)})
    if not condition:
        errors.append(description)

def unique_index(items, label):
    result = {item["id"]: item for item in items}
    check(len(result) == len(items), f"Unique {label} IDs")
    return result

project = json.loads((root / "fixtures/project.seed.json").read_text(encoding="utf-8-sig"))
register = json.loads((root / "fixtures/asset-register.template.json").read_text(encoding="utf-8-sig"))
units = unique_index(project["units"], "unit")
collections = unique_index(project["collections"], "collection")
plans = unique_index(project["plans"], "plan")
tours = unique_index(project["tours"], "tour")
assets = unique_index(register["assets"], "asset")
unique_index(project["landmarks"], "landmark")
unique_index(project["amenities"], "amenity")
check(len(units) == 6 and len(collections) == 3, "Six homes and three collections")
check(set(project["building"]["exampleFloors"]) == {4, 8, 12}, "Canonical example floors")
check(project["building"]["residentialFloors"] == 12, "Twelve residential floors")
check(len(project["landmarks"]) == 5, "Five landmarks")
check(len(project["amenities"]) == 4, "Four amenities")
check(len({u["sceneNodeId"] for u in units.values()}) == 6, "Unique unit scene proxies")
for floor in (4, 8, 12):
    on_floor = [u for u in units.values() if u["floor"] == floor]
    check(len(on_floor) == 2 and {u["position"] for u in on_floor} == {"west", "east"}, f"Two opposite homes on floor {floor}")
for uid, unit in units.items():
    collection = collections.get(unit["collectionId"])
    plan = plans.get(unit["planId"])
    tour = tours.get(unit["tourId"])
    check(bool(collection and plan and tour), f"{uid}: references resolve")
    check(unit["buildingId"] == project["building"]["id"] and unit["floor"] in (4, 8, 12), f"{uid}: building and floor valid")
    check(unit["status"] in {"available", "reserved", "sold"} and unit["isDemo"] is True, f"{uid}: status and demo flag")
    check(unit["tourRelationship"] == "representative" and unit["areaDefinition"] == "illustrative-internal", f"{uid}: truthful definitions")
    check(unit["sceneNodeId"] == f"unit_{uid}" and unit["planOrientation"] == unit["position"], f"{uid}: proxy/orientation mapping")
    if collection and plan:
        check(all(unit[k] == collection[k] for k in ("bedrooms", "internalAreaM2", "terraceAreaM2", "planId")), f"{uid}: collection metrics match")
        check(plan["collectionId"] == collection["id"], f"{uid}: collection/plan match")
    check(all(isinstance(unit[k], (int, float)) and unit[k] > 0 for k in ("bedrooms", "internalAreaM2", "terraceAreaM2", "samplePriceINR")), f"{uid}: positive metrics")
for tid, tour in tours.items():
    rooms = unique_index(tour["rooms"], f"{tid} room")
    check(set(rooms) == {"living", "bedroom", "balcony"} and tour["defaultRoomId"] in rooms, f"{tid}: room set")
    for rid, room in rooms.items():
        check(all(h["targetRoomId"] in rooms for h in room["hotspots"]), f"{tid}/{rid}: hotspot destinations resolve")
for plan in plans.values():
    check(all(r in plan["roomIds"] for r in plan["tourRoomMapping"]), f"{plan['id']}: mapped rooms exist")
    check(all(r in {"living", "bedroom", "balcony"} for r in plan["tourRoomMapping"].values()), f"{plan['id']}: mapped tour destinations")

def asset_references(value):
    if isinstance(value, dict):
        for key, nested in value.items():
            if key.lower().endswith("assetid") and isinstance(nested, str):
                yield nested
            yield from asset_references(nested)
    elif isinstance(value, list):
        for nested in value:
            yield from asset_references(nested)

refs = set(asset_references(project))
check(refs <= set(assets), "All seed asset IDs declared in asset template")
check(all(a["fallbackId"] is None or a["fallbackId"] in assets for a in assets.values()), "All asset fallback references resolve")
check(all(a["status"] == "planned" and a["localPath"] is None for a in assets.values()), "Template honestly marks assets uncreated")

for path in root.glob("*.md"):
    for target in re.findall(r"\]\(([^)]+)\)", path.read_text(encoding="utf-8-sig")):
        if not re.match(r"https?://|#", target):
            check((path.parent / target.split("#", 1)[0]).exists() or target == "package-validation.json", f"Local link {path.name} -> {target}")

contract = (root / "01-PRODUCT-CONTRACT.md").read_text(encoding="utf-8-sig")
defined = set(re.findall(r"^\| (REQ-\d{2}) \|", contract, flags=re.MULTILINE))
check(defined == {f"REQ-{i:02d}" for i in range(1, 19)}, "18 uniquely named required capabilities")
qa = (root / "07-TESTING-AND-ACCEPTANCE.md").read_text(encoding="utf-8-sig")
check(all(req in qa for req in defined), "All requirements included in verification mapping")
runbook = (root / "06-SEQUENTIAL-IMPLEMENTATION.md").read_text(encoding="utf-8-sig")
check(all(f"## Phase {i} " in runbook for i in range(11)), "Sequential phases 0 through 10 present")

# Verify the original Skyline zoning rectangles cover the envelope without overlap.
zones = [(0,7,10,16),(7,12,10,16),(0,7,0,6),(7,12,0,6),(0,5,6,10),
         (7,9,6,7.5),(7,9,7.5,9),(5,7,6,10),(9,12,6,9),(7,12,9,10)]
area = sum((x2-x1)*(z2-z1) for x1,x2,z1,z2 in zones)
overlap = any(max(a[0],b[0]) < min(a[1],b[1]) and max(a[2],b[2]) < min(a[3],b[3])
              for i,a in enumerate(zones) for b in zones[i+1:])
check(area == 192 and not overlap, "Skyline room zoning covers 192 m2 without rectangle overlap")
report = {"scope":"Specification-package checks only; no website exists or was tested", "checks":len(checks), "failures":errors, "results":checks}
(root / "package-validation.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(json.dumps({"checks":len(checks), "failures":errors, "units":len(units), "assets":len(assets)}, indent=2))
raise SystemExit(1 if errors else 0)
