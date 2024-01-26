import React, { useCallback, useEffect, useState } from 'react'
import style from './index.module.less'
import {
    CustomControl,
    LarkMap,
    LarkMapProps,
    LocationSearch,
    LocationSearchOption,
    LogoControl,
    Marker,
    ScaleControl
} from '@antv/larkmap'
import { amapKey, WebServerKey } from '@renderer/keys/appKeys'
import { useAmapIpPlace } from '@renderer/request'
import { ILngLat, Scene } from '@antv/l7'
import { Slider } from 'antd'

const MapApp: React.FC = () => {
    const [clickPosition, setClickPosition] = useState<ILngLat>()
    const handleClick = (e: { lnglat: { lng: number; lat: number } }) => {
        console.log(e)
        const { lng, lat } = e.lnglat
        setClickPosition({ lng, lat })
    }
    const config: LarkMapProps = {
        mapType: 'Gaode',
        mapOptions: {
            style: 'light',
            center: [116.408726, 39.905416],
            zoom: 9,
            token: amapKey // 密钥自己上高德申请一下=>https://console.amap.com/dev/index
        }
    }
    const AmapIpData = useAmapIpPlace()
    const [Scene, setScene] = useState<Scene>()
    useEffect(() => {
        if (AmapIpData) {
            const [[ldlLongitude, ldLatitude], [rtlLongitude, rtLatitude]] =
                // eslint-disable-next-line no-unsafe-optional-chaining
                AmapIpData?.data.rectangle.split(';').map((item) => item.split(','))

            const longitude = (parseFloat(ldlLongitude) + parseFloat(rtlLongitude)) / 2
            const latitude = (parseFloat(ldLatitude) + parseFloat(rtLatitude)) / 2
            Scene?.setCenter([longitude, latitude])
        }
        if (Scene) {
            syncMapCenter()

            Scene?.on('moveend', syncMapCenter)
            Scene?.on('zoomend', syncMapCenter)
        }
    }, [Scene, AmapIpData])
    const onSceneLoaded = (scene: Scene) => {
        setScene(scene)
    }
    const [location, setLocation] = useState('')
    const [searchVal, setSearVal] = useState<string>()
    const onSearch = (name?: string, item?: LocationSearchOption) => {
        // console.log({ item, name })
        name && setSearVal(name)
        const { longitude, latitude } = item!
        Scene?.setZoomAndCenter(10, [longitude, latitude])
    }
    // 同步地图中心点至 location 中
    const syncMapCenter = useCallback(() => {
        if (Scene) {
            const { lng, lat } = Scene.getCenter()
            setLocation(`${lng},${lat}`)
            const Zoom = Scene.getZoom()
            setZoom(Zoom)
        }
    }, [Scene])
    const [zoom, setZoom] = useState<number>()
    const SliderZoomChange = (e: number) => {
        setZoom(e)
        Scene?.setZoom(e)
    }

    return (
        <div className={style.page}>
            <LarkMap
                onSceneLoaded={onSceneLoaded}
                {...config}
                style={{ height: '300px' }}
                onClick={handleClick}
            >
                <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
                <ScaleControl />
                <CustomControl position="topleft">
                    <LocationSearch
                        searchParams={{
                            key: WebServerKey,
                            location
                        }}
                        autoFocus
                        placeholder="查找地点、公交、地铁"
                        value={searchVal}
                        onChange={onSearch}
                    />
                </CustomControl>
                {zoom && (
                    <CustomControl position="rightcenter">
                        <div style={{ height: 180 }}>
                            <Slider
                                vertical
                                value={zoom}
                                max={17}
                                min={1}
                                step={0.001}
                                onChange={SliderZoomChange}
                            />
                        </div>
                    </CustomControl>
                )}
                <LogoControl position="bottomright" />
                {clickPosition?.lat && <Marker lngLat={clickPosition} />}
            </LarkMap>
            点击经纬度：
            {clickPosition?.lat ? `经度：${clickPosition.lng}, 纬度：${clickPosition.lat}` : '暂无'}
        </div>
    )
}

export default MapApp
