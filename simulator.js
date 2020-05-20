let r = {
    0:0 , 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 ,
    8:0 , 9:0 , 10:0, 11:0, 12:0, 13:0, 14:0, 15:0,
    16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0,
    24:0, 25:0, 26:0, 27:0, 28:0, 29:0, 30:0, 31:0,
};

let fun_80201ccc = () => {

};

let fun_80201df8 = () => {
    /*
    **************************************************************
    *                          FUNCTION                          *
    **************************************************************
    undefined FUN_80201df8()
    assume GQR0 = 0x0
    assume GQR2 = 0x4070407
    assume GQR3 = 0x50005
    assume GQR4 = 0x60006
    assume GQR5 = 0x70007
    assume GQR6 = 0x4070407
    assume GQR7 = 0xe070e07
    assume r13 = 0x80652980
    assume r2 = 0x80655c80
    undefined         r3:1           <RETURN>
    undefined4        Stack[0x4]:4   local_res4                              XREF[2]:     80201e00(W),
        80201e30(R)
    undefined4        Stack[-0x4]:4  local_4                                 XREF[2]:     80201e04(W),
        80201e34(R)
    undefined4        Stack[-0x8]:4  local_8                                 XREF[2]:     80201e0c(W),
        80201e38(R)
    undefined4        Stack[-0x10]:4 local_10                                XREF[1]:     80201df8(W)
    FUN_80201df8                                    XREF[3]:     FUN_80033d5c:80033dc4(c),
        FUN_80054040:800540a8(c),
        FUN_80201d88:80201dac(c)
    80201df8 94 21 ff f0     stwu       r1,local_10(r1)
    80201dfc 7c 08 02 a6     mfspr      r0,LR
    80201e00 90 01 00 14     stw        r0,local_res4(r1)
    80201e04 93 e1 00 0c     stw        r31,local_4(r1)
    80201e08 7c 9f 23 78     or         r31,r4,r4
    80201e0c 93 c1 00 08     stw        r30,local_8(r1)
    80201e10 7c 7e 1b 78     or         r30,r3,r3
    80201e14 4b ff fe b9     bl         FUN_80201ccc                                     undefined FUN_80201ccc()
    80201e18 54 60 05 29     rlwinm.    r0,r3,0x0,0x14,0x14
    80201e1c 41 82 00 0c     beq        LAB_80201e28
    80201e20 a8 7e 00 30     lha        r3,0x30(r30)
    80201e24 48 00 00 0c     b          LAB_80201e30
    LAB_80201e28                                    XREF[1]:     80201e1c(j)
    80201e28 a8 7e 00 30     lha        r3,0x30(r30)
    80201e2c b3 fe 00 30     sth        r31,0x30(r30)
    LAB_80201e30                                    XREF[1]:     80201e24(j)
    80201e30 80 01 00 14     lwz        r0,local_res4(r1)
    80201e34 83 e1 00 0c     lwz        r31,local_4(r1)
    80201e38 83 c1 00 08     lwz        r30,local_8(r1)
    80201e3c 7c 08 03 a6     mtspr      LR,r0
    80201e40 38 21 00 10     addi       r1,r1,0x10
    80201e44 4e 80 00 20     blr
    */

    /*80201df8*/ stwu( "SP", -0x0010 , "SP" ); /* stwu	sp, -0x0010 (sp) */  /*b3fe0030*/


    // if( true ) {
    //     /*80201e28*/ lha( "3" , 0x30 , "30" );
    //     /*80201e2c*/ sth( "31" , 0x30 , "30" );
    // }
    // else
    // {
    //     /*80201e20*/ lha( "3" , 0x30 , "30" );
    // }
};



// Set halword from location
const sth = ( dest , source , p1 ) => {
    r[dest] = source + r[p1];
};

const lha = ( dest , source , p1 ) => {

};

const stw = ( dest , source , p1 ) => {

};



console.log( r );
fun_80201df8( );
console.log( r );