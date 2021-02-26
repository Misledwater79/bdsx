/**
 * This example is just skip half of movement packets.
 * 
 * CAUTION: this example is only works for two players. need to implement it more
 */

import { CANCEL, MinecraftPacketIds, nethook, NetworkIdentifier } from "bdsx";


interface Counter {
    counter:number;
}
const map = new WeakMap<NetworkIdentifier, Counter>();
nethook.sendRaw(MinecraftPacketIds.MovePlayer).on((packet, size, ni)=>{
    let field = map.get(ni);
    if (field === undefined) map.set(ni, field = {counter: 0});

    field.counter++;
    if (field.counter >= 2) {
        field.counter = 0;
        return CANCEL;
    }
});
