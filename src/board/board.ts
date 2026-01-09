// Layout of component managers including spatial arrangement

import { ComponentManager } from "../component_management/types"

type LayoutPos = [x: number, y: number]

type CompManagerLayout = {
    comp_manager: ComponentManager
    pos: LayoutPos
}

class Board {
    grid_w: number = 10
    grid_h: number = 10

}