"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Copy, Volume2, VolumeX } from "lucide-react"

export default function MinecraftServerLanding() {
  const [copied, setCopied] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const serverIP = "play.corpssmp.lol"

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }

    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Auto-play failed, user interaction required
      })
    }

    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(serverIP)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const toggleMusic = () => {
    if (videoRef.current && audioRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <video ref={videoRef} loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0">
        <source src="https://files.catbox.moe/sndqu2.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop>
        <source src="https://files.catbox.moe/su3mg2.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed inset-0 bg-background/60 z-10"></div>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>

      <div className="relative z-20">
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1
                className="text-6xl md:text-8xl font-mono font-bold text-primary tracking-tight"
                style={{ fontFamily: "Courier New, monospace" }}
              >
                Corps SMP
              </h1>
              <div className="bg-card/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border">
                <p className="text-lg text-muted-foreground mb-4">Server IP</p>
                <div className="flex items-center justify-center gap-4">
                  <code className="text-2xl md:text-3xl font-mono bg-muted px-6 py-3 rounded-md">{serverIP}</code>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="lg"
                    className="relative bg-background/80 backdrop-blur-sm flex items-center gap-2"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>

            {copied && (
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
                <div className="checkmark-animation">
                  <div className="bg-secondary text-secondary-foreground rounded-full p-4">
                    <Check className="h-8 w-8" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {showContent && (
          <div className="fade-in">
            <section className="py-6 px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-4xl md:text-6xl font-sans font-bold text-foreground">Welcome to Corps SMP</h2>
                <p className="text-xl md:text-2xl text-muted-foreground">Join our adventure and survive together!</p>
              </div>
            </section>

            <section className="py-4 px-4">
              <div className="max-w-3xl mx-auto">
                <Card className="p-8 bg-card/90 backdrop-blur-sm">
                  <CardContent className="text-center space-y-4">
                    <p className="text-lg leading-relaxed">
                      Corps SMP is a community-driven Minecraft server where you can build, survive, and create epic
                      memories with friends. Join now and be part of our story!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="py-6 px-4">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-sans font-bold text-center mb-8">How to Join</h3>
                <Card className="p-8 bg-card/90 backdrop-blur-sm">
                  <CardContent>
                    <ol className="space-y-4 text-lg">
                      <li className="flex items-start gap-4">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          1
                        </span>
                        <span>Launch Minecraft Java Edition 1.21</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          2
                        </span>
                        <span>Click Multiplayer → Add Server</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          3
                        </span>
                        <span>
                          Enter IP: <code className="bg-muted px-2 py-1 rounded text-sm">{serverIP}</code>
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          4
                        </span>
                        <span>Join and start surviving!</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="py-6 px-4">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-sans font-bold text-center mb-8">Server Rules</h3>
                <Card className="p-8 border-2 border-dashed border-muted-foreground/30 bg-card/80 backdrop-blur-sm">
                  <CardContent>
                    <div
                      className="space-y-4 text-lg font-mono"
                      style={{ fontFamily: "Comic Sans MS, cursive, monospace" }}
                    >
                      <p>Play peacefully 🕊️</p>
                      <p>{"Don't break other players' houses or farms ❌"}</p>
                      <p>Respect everyone 🌍</p>
                      <p>Rule-breaking = ban 🚫</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="py-6 px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <a href="https://t.me/corpssmp" target="_blank" rel="noopener noreferrer">
                    📢 Updates
                  </a>
                </Button>
              </div>
            </section>

            <section className="py-6 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl md:text-2xl text-muted-foreground italic">
                  This is an ordinary world— no plugins, nothing special, just a permanent server. Survival, survive!
                </p>
              </div>
            </section>

            <footer className="py-12 px-4 border-t border-border/50">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground">This server is running with ❤️ by Rio</p>
                <Button variant="outline" asChild className="bg-background/80 backdrop-blur-sm">
                  <a href="https://t.me/eternalaura" target="_blank" rel="noopener noreferrer">
                    Contact
                  </a>
                </Button>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  )
}
