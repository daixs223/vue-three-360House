 const  materialConfig = {
    toilet: {
        previewImg: require('@/assets/images/preview/toilet.jpg'),
        name:'厕所',
        picList:[
            require('@/assets/images/material/toilet/mobile_r.jpg'),
            require('@/assets/images/material/toilet/mobile_l.jpg'),
            require('@/assets/images/material/toilet/mobile_u.jpg'),
            require('@/assets/images/material/toilet/mobile_d.jpg'),
            require('@/assets/images/material/toilet/mobile_f.jpg'),
            require('@/assets/images/material/toilet/mobile_b.jpg'),
        ],
        marker:[
            {
                position:{x:49,y:1,z:4},
                scale:7,
                name:'cloakroom',
                materialName:'masterBedroom',
                icon:require('@/assets/images/icon/icon_top.png')
            },
        ]

    },
    cloakroom: {
        previewImg: require('@/assets/images/preview/cloakroom.jpg'),
        name:'衣帽间',
        picList:[
            require('@/assets/images/material/cloakroom/mobile_r.jpg'),
            require('@/assets/images/material/cloakroom/mobile_l.jpg'),
            require('@/assets/images/material/cloakroom/mobile_u.jpg'),
            require('@/assets/images/material/cloakroom/mobile_d.jpg'),
            require('@/assets/images/material/cloakroom/mobile_f.jpg'),
            require('@/assets/images/material/cloakroom/mobile_b.jpg'),
        ],
        marker:[
            {
                position:{x:16,y:-12,z:43},
                scale:7,
                name:'主卧',
                materialName:'masterBedroom',
                icon:require('@/assets/images/icon/icon_top.png')
            },
        ]

    },
    drawingRoom: {
        previewImg: require('@/assets/images/preview/drawingRoom.jpg'),
        name:'客厅',
        picList:[
            require('@/assets/images/material/drawingRoom/mobile_r.jpg'),
            require('@/assets/images/material/drawingRoom/mobile_l.jpg'),
            require('@/assets/images/material/drawingRoom/mobile_u.jpg'),
            require('@/assets/images/material/drawingRoom/mobile_d.jpg'),
            require('@/assets/images/material/drawingRoom/mobile_f.jpg'),
            require('@/assets/images/material/drawingRoom/mobile_b.jpg'),
        ],
        marker:[
            {
                position:{x:-12,y:3,z:-48},
                scale:7,
                name:'主卧',
                materialName:'masterBedroom',
                icon:require('@/assets/images/icon/icon_top.png')
            },
            {
                position:{x:-45,y:-1,z:20},
                scale:7,
                name:'厨房',
                materialName:'kitchen',
                icon:require('@/assets/images/icon/icon_top.png')
            },
            {
                position:{x:47,y:0,z:38},
                scale:7,
                name:'次卧',
                materialName:'secondaryBedroom',
                icon:require('@/assets/images/icon/icon_top.png')
            },
        ]
    },
    kitchen: {
        previewImg: require('@/assets/images/preview/kitchen.jpg'),
        name:'厨房',
        picList:[
            require('@/assets/images/material/kitchen/mobile_r.jpg'),
            require('@/assets/images/material/kitchen/mobile_l.jpg'),
            require('@/assets/images/material/kitchen/mobile_u.jpg'),
            require('@/assets/images/material/kitchen/mobile_d.jpg'),
            require('@/assets/images/material/kitchen/mobile_f.jpg'),
            require('@/assets/images/material/kitchen/mobile_b.jpg'),
        ],
        marker:[
            {
                position:{x:-5,y:-19,z:50},
                scale:10,
                name:'客厅',
                materialName:'drawingRoom',
                icon:require('@/assets/images/icon/icon_top.png')
            },
        ]

    },
    secondaryBedroom: {
        previewImg: require('@/assets/images/preview/secondaryBedroom.jpg'),
        name:'次卧',
        picList:[
            require('@/assets/images/material/secondaryBedroom/mobile_r.jpg'),
            require('@/assets/images/material/secondaryBedroom/mobile_l.jpg'),
            require('@/assets/images/material/secondaryBedroom/mobile_u.jpg'),
            require('@/assets/images/material/secondaryBedroom/mobile_d.jpg'),
            require('@/assets/images/material/secondaryBedroom/mobile_f.jpg'),
            require('@/assets/images/material/secondaryBedroom/mobile_b.jpg'),
        ],
        marker:[
            {
                position:{x:-22,y:-2,z:16},
                scale:7,
                name:'客厅',
                materialName:'drawingRoom',
                icon:require('@/assets/images/icon/icon_left.png')
            },
        ]

    },
    masterBedroom: {
        previewImg: require('@/assets/images/preview/masterBedroom.jpg'),
        name:'主卧',
        picList:[
            require('@/assets/images/material/masterBedroom/mobile_r.jpg'),
            require('@/assets/images/material/masterBedroom/mobile_l.jpg'),
            require('@/assets/images/material/masterBedroom/mobile_u.jpg'),
            require('@/assets/images/material/masterBedroom/mobile_d.jpg'),
            require('@/assets/images/material/masterBedroom/mobile_f.jpg'),
            require('@/assets/images/material/masterBedroom/mobile_b.jpg'),
        ],
        marker:[
            {
                position:{x:-49,y:0,z:17},
                scale:5,
                name:'衣帽间',
                materialName:'cloakroom',
                icon:require('@/assets/images/icon/icon_top.png')
            },
            {
                position:{x:-49,y:0,z:10},
                scale:5,
                name:'卫生间',
                materialName:'toilet',
                icon:require('@/assets/images/icon/icon_right.png')
            },
        ]
    },
}

export default materialConfig;
